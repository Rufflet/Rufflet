# Profile generator

Renders the animated SVGs in `../assets/` from Vue components, and rewrites the
`<!-- projects -->` / `<!-- links -->` blocks of `../README.md`.

```bash
npm install
npm run dev     # live gallery at /preview/ — every SVG in light + dark, with replay
npm run build   # write ../assets/*.svg and update ../README.md
npm run snap    # render README via GitHub's markdown API, screenshot into .snap/
```

All content lives in `src/profile.config.ts` — flip `visible` to show or hide a project or link.

Constraints the design follows (GitHub serves README images through its camo proxy as `<img>`):
- no scripts, no external fonts: JetBrains Mono is subset per file and inlined as base64;
- animation is CSS `@keyframes` only, played once; `prefers-reduced-motion` shows the final frame;
- one SVG per item, themed by `prefers-color-scheme` inside the file — `<picture>` inside a link
  gets split by GitHub's auto-linking of images, so clickable cards can't use it.
