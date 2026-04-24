# AGENTS.md — stellar-site

This repository is the public website for Stellar Download Manager.

## Stack

- Pure HTML + CSS, no frameworks, no build steps
- Vanilla JS only where strictly necessary (no jQuery, no React, no bundler)
- Deployable as static files on any host (GitHub Pages, Netlify, nginx, etc.)

## Design Rules

**Style: 2012 golden-age internet — functional, flat, dark.**
- Dark background (`#111`), high-contrast text (`#ddd`/`#fff`)
- Accent colour: `#4488dd` (matches the app)
- No gradients that look like AI slop
- No glassmorphism, no purple/pink gradients, no "glow" effects
- No rounded-corner everything — use borders purposefully
- Typography: system sans-serif stack for body, `monospace` for code/version strings
- Layouts that look like they were designed by a developer who cares, not a marketing team

## File Layout

```
index.html              Main landing page
style.css               All styles — no inline styles except overrides
404.html                Simple 404 page
screenshots/            PNG or JPG screenshots referenced in index.html
  main-window.png
  video-picker.png
  scheduler.png
  progress-dialog.png
```

## Adding Screenshots

1. Drop the PNG/JPG into `screenshots/`
2. In `index.html`, find the matching `<figure class="screenshot-item">`
3. Replace the `<div class="screenshot-placeholder">` with:
   `<img src="screenshots/your-file.png" alt="Description">`
4. Update the `<figcaption>` if needed

Recommended size: at least 900px wide, cropped to the relevant UI area.
Use PNG for UI screenshots (lossless). Keep files under 500 KB.

## Content Guidelines

- Write like a human developer explaining the tool to other developers
- No buzzwords: no "blazing fast", no "seamless", no "powerful", no "robust"
- Do not mention yt-dlp by name anywhere on the site — refer to it as "the built-in video downloader"
- Features get one concrete sentence each — what it does, not how it feels
- Download links use the pattern: `https://github.com/Ninka-Rex/Stellar/releases/latest`
- GitHub: `https://github.com/Ninka-Rex/Stellar`

## Versioning

Update the version number in `index.html` (look for `data-version`) when a new
release ships. The download links point to GitHub Releases so they self-update.
