#!/usr/bin/env python3
# geocode.py - geocode missing lat/lng using Nominatim (OpenStreetMap)
# Usage: pip install requests
#        python3 geocode.py
import requests, time, json
from pathlib import Path

EMAIL = "your-email@example.com"   # <-- CHANGE this to your email (Nominatim requirement)
INPUT = Path("dtes-resources.json")
OUTPUT = Path("dtes-resources.geocoded.json")

if not INPUT.exists():
    print("Error: dtes-resources.json not found in repo root.")
    raise SystemExit(1)

def geocode(address):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
        "limit": 1,
        "addressdetails": 0,
        "email": EMAIL
    }
    headers = {"User-Agent": "DTES-Resource-Geocoder/1.0 (" + EMAIL + ")"}
    r = requests.get(url, params=params, headers=headers, timeout=20)
    if r.status_code == 200:
        arr = r.json()
        if arr:
            return float(arr[0]["lat"]), float(arr[0]["lon"])
    return None

def main():
    data = json.loads(INPUT.read_text(encoding="utf-8"))
    changed = False
    for i, item in enumerate(data):
        if (('lat' not in item or item['lat'] is None) and item.get('address')):
            addr = item['address']
            print(f"[{i+1}/{len(data)}] Geocoding: {item.get('name','(no name)')} — {addr}")
            try:
                res = geocode(addr)
            except Exception as e:
                print("  Request failed:", e)
                res = None
            if res:
                item['lat'], item['lng'] = res
                print("  ->", res)
                changed = True
            else:
                print("  -> not found")
            time.sleep(1.1)  # be polite to Nominatim
    if changed:
        OUTPUT.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        print("Wrote geocoded output to", OUTPUT)
    else:
        print("No changes (no addresses geocoded).")
if __name__ == "__main__":
    main()
