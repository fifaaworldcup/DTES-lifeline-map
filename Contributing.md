# Contributing to the DTES Lifeline Map

Thank you for helping maintain this vital community resource.  
This guide explains how to add new resources, fix bugs, improve accessibility, and update translations.

---

## 🛠 How to Contribute

### 1. Fork & Branch

```bash
git checkout -b feat/<description>
```

### 2. Edit JSON

Add or update entries in `dtes-resources.json`.  
Use this template:

```json
{
  "name": "Example Resource",
  "type": "Shelter",
  "address": "123 Example St",
  "phone": "604-555-1234",
  "hours": "24/7",
  "lat": 49.2801,
  "lng": -123.1009,
  "description": "Short helpful info",
  "source": "Official site or gov listing",
  "verified_at": "2025-11-18"
}
```

### 3. Validate JSON
```bash
jq . dtes-resources.json
```

### 4. Test Locally
```bash
python3 -m http.server 8000
```

### 5. Commit & Push
```bash
git add dtes-resources.json
git commit -m "feat: add <Resource Name>"
git push origin feat/<description>
```

### 6. Open PR
Include:
- What changed
- Why
- Source links

---

## 🌍 Translations

If adding a language:
- Update the translation dictionary in `index.html`
- Provide full UI + popup translations
- Ensure it covers every key

---

## ♿ Accessibility Guidelines

Any PR must respect accessibility:
- Keyboard tab focus usable
- ARIA labels included
- Screen-reader friendly wording
- High contrast works
- TTS works with popups

---

## 🗺 Map / UI Changes

- Maintain Tailwind style conventions  
- Do not introduce breaking layout changes without discussion  
- Ensure mobile UI still works  

---

## 🧪 Testing Checklist

Before submitting:
- Search works
- Filters work
- Map loads
- Popups translate
- Accessibility toggles work
- JSON loads without errors

---

## 🧑‍🤝‍🧑 Code of Conduct
Be respectful, clear, and constructive.  
Add `CODE_OF_CONDUCT.md` later if desired.

---

## ❤️ Thank you
Every contribution improves safety and access for the DTES community.

