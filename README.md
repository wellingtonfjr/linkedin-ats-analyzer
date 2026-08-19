# LinkedIn ATS Profile Analyzer

A Chrome extension that analyzes a LinkedIn profile PDF export for ATS (Applicant Tracking System) keyword friendliness and recruiter appeal, with feedback tuned to your target region and tech stack.

## How it works

1. Export your LinkedIn profile as a PDF (LinkedIn profile page → **More** → **Save to PDF**).
2. Open the extension, upload the PDF.
3. The extension extracts the text locally (via [pdf.js](https://mozilla.github.io/pdf.js/), bundled — no server involved) and sends it to your chosen AI provider (Anthropic or OpenAI) using your own API key.
4. Get a scored breakdown (overall / ATS / recruiter appeal), section-by-section strengths, issues, suggestions, missing keywords, and a suggested headline rewrite.

Your API key is stored only in your browser's local extension storage and is sent directly from your browser to the provider's API — never to any server run by this extension.

## Load the extension in Chrome

1. Go to `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. Click the extension icon, open settings (⚙), pick a provider, and paste your API key.

## Project structure

```
manifest.json          MV3 manifest
popup/                  Popup UI (HTML/CSS/JS)
js/
  storage.js            chrome.storage wrapper for settings
  providers.js           Anthropic + OpenAI API calls, prompt, JSON schema
  pdf-extract.js          PDF -> text extraction (pdf.js)
lib/                    Bundled pdf.js (local, no CDN — required by MV3 CSP)
icons/                  Extension icons
```

## Notes

- Chrome only for now (Safari uses a different extension engine).
- Requires your own Anthropic or OpenAI API key — usage costs are yours, there's no backend.
