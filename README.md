# Hashim Mohamed Salim: portfolio

A fast, dependency-free personal site (HTML, CSS and vanilla JS).

## Structure

```
index.html            Page structure + hero copy
css/styles.css        All styling (light + dark themes via CSS variables)
js/data.js            ← All content lives here. Edit this file to update the site.
js/main.js            Rendering + interactions
assets/               CV PDF and favicon
```

## Updating content

Everything below the hero is rendered from `js/data.js`:

- **Profile links:** fill in `links.linkedin` and `links.github`. Empty links stay hidden.
- **Project links:** each project has `links: { code: '', live: '' }`. Add a GitHub repo URL and/or a live demo URL and the buttons appear on the card.
- **New project:** copy an existing entry and give it a unique `id`. Pick a `visual`: `spectrum`, `forecast`, `chain`, `pose`, `candles`, `exchange`, `network` or `storefront`.
- **Skills:** a skill links to every role, project or degree whose `stack` contains the same name, so keep the spellings consistent.
- **Availability pill:** change or clear `status`.
- **CV:** replace `assets/Hashim_Mohamed_Salim_CV.pdf` (keep the filename, or update `cv` in `data.js` and the two links in `index.html`).

## Run locally

```bash
python3 -m http.server 4812
```

Then open http://localhost:4812.

## Deploy

It's a static site, so any static host works:

- **GitHub Pages:** push the folder to a repo, then go to Settings → Pages → deploy from the `main` branch.
- **Netlify:** drag the folder onto https://app.netlify.com/drop.
- **Vercel:** `npx vercel` in this folder.

## Details

- `⌘K` / `Ctrl K` / `/` opens a command menu to jump to any section or project.
- Theme follows the system setting. The toggle remembers the visitor's choice.
- All motion respects `prefers-reduced-motion`.
