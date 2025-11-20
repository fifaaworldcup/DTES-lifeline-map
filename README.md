# DTES Lifeline Map — Vancouver

**DTES Lifeline Map** is a mobile‑friendly, multilingual, accessibility‑optimized map of essential community resources in Vancouver’s Downtown Eastside (DTES).  
The project provides an easy way to locate shelters, food programs, harm‑reduction sites, crisis hotlines, naloxone availability, community centres, and more — all powered by a single unified JSON file.

---

## 🌐 Live Site


```
https://fifaaworldcup.github.io/DTESsupport.github.io/
```
```

---

## 📁 Project Structure
```
/
├─ index.html                 # Main site (loads JSON)
├─ dtes-resources.json        # Canonical resource list
├─ assets/                    # Icons, fonts, images (optional)
├─ README.md
├─ CONTRIBUTING.md
├─ SECURITY.md
```

---

## ✨ Features

### 🗺 Map + Navigation
- Leaflet map with clusters & popups  
- Routing & “Find My Location”  
- Quick exit button  
- QR code generator for each location  

### 🔍 Search & Filtering
- Category filters
- Search bar with partial matching
- Hotlines included (optional markers off)

### 🌍 Multilingual UI
Supports:  
English, Farsi, Hindi, Urdu, Punjabi, Bengali, Tagalog, Cantonese, Mandarin, Spanish, Arabic, Dutch, Italian, Swedish — and easily extendable.

### ♿ Accessibility Tools
- Dyslexic‑friendly font mode
- Large text mode
- Extra letter spacing
- High‑contrast mode
- Reduced motion
- Large cursor
- Keyboard‑first navigation
- TTS (Text‑to‑Speech) for popups
- Ability to minimize / expand accessibility widget

### 📦 Data‑Driven
- Everything powered by `dtes-resources.json`
- Hotlines included in JSON
- Each entry includes `verified_at` & `source`

---

## 🚀 Getting Started (Local Development)

### Clone
```bash
git clone https://github.com/<your-username>/DTESsupport.github.io
cd DTESsupport.github.io
```

### Run locally (recommended)
```bash
python3 -m http.server 8000
```
Then open:  
`http://localhost:8000/`

### Update Resources
Edit `dtes-resources.json` with any JSON editor or text editor.

---

## 🧩 JSON Structure

Example entry:

```json
{
  "name": "Carnegie Community Centre",
  "address": "401 Main St, Vancouver, BC",
  "phone": "604-665-2220",
  "hours": "Mon–Sun 9am–11pm",
  "type": "Food",
  "lat": 49.2813,
  "lng": -123.1003,
  "description": "Hot meals, programs, support",
  "source": "City of Vancouver",
  "verified_at": "2025-11-18"
}
```

Hotlines may omit `lat` / `lng`.

---

## 🌐 Translations

To add or edit a language:
1. Open `index.html`
2. Find the translation dictionary (`const T = {...}`)
3. Add your language code section (e.g., `"fr": { ... }`)

---

## ♿ Accessibility

When adding new UI elements:
- Ensure focusability
- Use semantic elements (`<button>`, `<a>`)
- Add `aria-label`s
- Verify keyboard-only navigation
- Test with screen readers

---

## 🧱 Offline Support (future plan)

Planned future additions:
- Service Worker (Workbox)
- Offline cached JSON
- Offline fallback map
- Cached translation bundles

---

## 💬 Contributing
See **CONTRIBUTING.md**

---

## 🔐 Security
See **SECURITY.md**

---

## 📜 License
MIT License


