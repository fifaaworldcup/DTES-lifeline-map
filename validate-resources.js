// validate-resources.js
// Usage: node validate-resources.js
const fs = require('fs');
const path = 'dtes-resources.json';

if(!fs.existsSync(path)){
  console.error('Error: dtes-resources.json not found in repo root.');
  process.exit(2);
}

const arr = JSON.parse(fs.readFileSync(path,'utf8'));
const problems = [];

arr.forEach((r, i) => {
  if(!r.name) problems.push(`item ${i}: missing name`);
  if(!r.type) problems.push(`item ${i}: missing type`);
  // lat/lng both present OR both absent
  const latHas = ('lat' in r) && (r.lat !== null);
  const lngHas = ('lng' in r) && (r.lng !== null);
  if(latHas !== lngHas) problems.push(`item ${i}: lat/lng mismatch (latHas=${latHas}, lngHas=${lngHas})`);
  // basic phone sanity
  if(r.phone && typeof r.phone !== 'string') problems.push(`item ${i}: phone should be a string`);
});

if(problems.length){
  console.error('Validation failed — problems found:');
  problems.forEach(p => console.error(' - ' + p));
  process.exit(2);
}
console.log('Validation OK —', arr.length, 'resources.');
process.exit(0);
