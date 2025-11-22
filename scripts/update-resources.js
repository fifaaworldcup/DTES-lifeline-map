/**
 * scripts/update-resources.js
 * Complete implementation to fetch external sources and merge into dtes-resources.json
 * Sources:
 * - https://news.gov.bc.ca/releases/2023SDPR0035-000944
 * - https://vancouver.ca/people-programs/free-and-low-cost-resources.aspx
 *
 * Run: node scripts/update-resources.js
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const SimpleGit = require('simple-git');
const cheerio = require('cheerio');

const RESFILE = path.join(__dirname,'../dtes-resources.json');
const git = SimpleGit();

// Geocoding API (you can replace with your preferred service)
const GEOCODING_API = 'https://nominatim.openstreetmap.org/search?format=json&limit=1';

async function geocode(address) {
  try {
    const response = await fetch(`${GEOCODING_API}&q=${encodeURIComponent(address + ', Vancouver, BC')}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
  } catch (err) {
    console.warn('Geocoding failed for address:', address, err.message);
  }
  return { lat: null, lng: null };
}

async function fetchVancouverList() {
  try {
    console.log('Fetching Vancouver free and low-cost resources...');
    const response = await fetch('https://vancouver.ca/people-programs/free-and-low-cost-resources.aspx');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const resources = [];
    
    // Look for resource information in the page
    // This is a simplified parser - you may need to adjust based on actual page structure
    $('.field-item, .content-item, p').each((i, elem) => {
      const text = $(elem).text().trim();
      
      // Look for patterns that indicate resources
      if (text.includes('Address:') || text.includes('Phone:') || text.includes('Hours:')) {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        
        let name = '';
        let address = '';
        let phone = '';
        let hours = '';
        let type = 'Uncategorized';
        
        lines.forEach(line => {
          if (line.includes('Address:')) {
            address = line.replace('Address:', '').trim();
          } else if (line.includes('Phone:')) {
            phone = line.replace('Phone:', '').trim();
          } else if (line.includes('Hours:')) {
            hours = line.replace('Hours:', '').trim();
          } else if (!name && line.length > 5) {
            name = line;
          }
        });
        
        // Determine type based on content
        if (text.toLowerCase().includes('food') || text.toLowerCase().includes('meal')) {
          type = 'Food';
        } else if (text.toLowerCase().includes('shelter') || text.toLowerCase().includes('housing')) {
          type = 'Shelter';
        } else if (text.toLowerCase().includes('clothing')) {
          type = 'Clothing';
        } else if (text.toLowerCase().includes('washroom')) {
          type = 'Washrooms';
        }
        
        if (name && address) {
          resources.push({
            name,
            address,
            phone,
            hours,
            type,
            source: 'Vancouver.ca - Free and low-cost resources',
            verified_at: new Date().toISOString().slice(0,10),
            status: 'open'
          });
        }
      }
    });
    
    console.log(`Found ${resources.length} resources from Vancouver.ca`);
    return resources;
  } catch (err) {
    console.error('Error fetching Vancouver resources:', err);
    return [];
  }
}

async function fetchBCNews() {
  try {
    console.log('Fetching BC News releases...');
    const response = await fetch('https://news.gov.bc.ca/releases/2023SDPR0035-000944');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const resources = [];
    
    // Extract resource information from the news release
    // This is a simplified parser - adjust based on actual content structure
    $('.field-item, .content-item, p').each((i, elem) => {
      const text = $(elem).text().trim();
      
      // Look for patterns that indicate resources
      if (text.includes('Vancouver') && (text.includes('support') || text.includes('service'))) {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        
        let name = '';
        let address = '';
        let phone = '';
        let hours = '';
        let type = 'Uncategorized';
        
        lines.forEach(line => {
          if (line.includes('Phone:') || line.includes('Contact:')) {
            phone = line.replace(/Phone:|Contact:/g, '').trim();
          } else if (line.includes('Hours:')) {
            hours = line.replace('Hours:', '').trim();
          } else if (!name && line.length > 10) {
            name = line;
          }
        });
        
        // Determine type based on content
        if (text.toLowerCase().includes('mental health')) {
          type = 'Mental Health';
        } else if (text.toLowerCase().includes('substance') || text.toLowerCase().includes('overdose')) {
          type = 'Naloxone';
        }
        
        if (name) {
          resources.push({
            name,
            address,
            phone,
            hours,
            type,
            source: 'BC News - SDPR0035-000944',
            verified_at: new Date().toISOString().slice(0,10),
            status: 'open'
          });
        }
      }
    });
    
    console.log(`Found ${resources.length} resources from BC News`);
    return resources;
  } catch (err) {
    console.error('Error fetching BC News:', err);
    return [];
  }
}

function normalize(item) {
  return {
    name: item.name || '',
    address: item.address || '',
    phone: item.phone || '',
    hours: item.hours || '',
    type: item.type || 'Uncategorized',
    lat: typeof item.lat === 'number' ? item.lat : null,
    lng: typeof item.lng === 'number' ? item.lng : null,
    description: item.description || '',
    source: item.source || '',
    verified_at: item.verified_at || (new Date()).toISOString().slice(0,10),
    status: item.status || 'open'
  };
}

function deduplicate(resources) {
  const seen = new Set();
  return resources.filter(item => {
    const key = `${item.name.toLowerCase()}-${item.address.toLowerCase()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

async function geocodeResources(resources) {
  console.log('Geocoding resources without coordinates...');
  for (let i = 0; i < resources.length; i++) {
    if (!resources[i].lat || !resources[i].lng) {
      if (resources[i].address) {
        const coords = await geocode(resources[i].address);
        resources[i].lat = coords.lat;
        resources[i].lng = coords.lng;
        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  return resources;
}

async function main(){
  try {
    const existing = fs.existsSync(RESFILE) ? JSON.parse(fs.readFileSync(RESFILE,'utf8')) : [];
    console.log(`Loaded ${existing.length} existing resources`);
    
    const vancouverResources = await fetchVancouverList();
    const bcNewsResources = await fetchBCNews();
    
    const allNewResources = [...vancouverResources, ...bcNewsResources];
    
    // Geocode new resources
    const geocodedResources = await geocodeResources(allNewResources);
    
    // Normalize all resources
    const normalizedNew = geocodedResources.map(normalize);
    
    // Merge with existing
    const merged = deduplicate([...existing, ...normalizedNew]);
    
    // Sort by type and name
    merged.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type);
      }
      return a.name.localeCompare(b.name);
    });
    
    fs.writeFileSync(RESFILE, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`Merged and wrote ${merged.length} entries to ${RESFILE}`);
    
    // Optionally commit & push
    try {
      await git.add(RESFILE);
      const status = await git.status();
      if(status.modified.includes(path.basename(RESFILE))){
        await git.commit('chore: update resources (auto)', {'--no-verify': null});
        await git.push();
        console.log('Changes committed and pushed to repository');
      }
    } catch(e){ 
      console.warn('git push failed', e.message); 
    }
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main().catch(e => { 
  console.error(e); 
  process.exit(1); 
});
