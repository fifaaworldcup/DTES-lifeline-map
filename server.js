// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const RESFILE = './dtes-resources.json';
const PORT = process.env.PORT || 3000;
const UPDATE_TOKEN = process.env.UPDATE_TOKEN || 'replace_this_token';

const app = express();
app.use(bodyParser.json({ limit: '2mb' }));

app.get('/resources.json', (req, res) => {
  if(!fs.existsSync(RESFILE)) return res.json([]);
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.sendFile(RESFILE, { root: __dirname });
});

app.post('/update-resources', (req, res) => {
  const token = req.get('x-update-token') || req.query.token;
  if(!token || token !== UPDATE_TOKEN) return res.status(401).json({ error: 'unauthorized' });
  const payload = req.body;
  if(!Array.isArray(payload)) return res.status(400).json({ error: 'payload must be an array' });
  const ok = payload.every(item => item.name && item.type);
  if(!ok) return res.status(400).json({ error: 'each item must include at least name and type' });
  fs.writeFileSync(RESFILE, JSON.stringify(payload, null, 2), 'utf8');
  return res.json({ status: 'ok', count: payload.length });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log('Updater server running on port', PORT);
});
