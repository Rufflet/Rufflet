// Gallery of every generated SVG, rendered live by the vite plugin in vite.config.ts.
// Images are shown via <img>, exactly how GitHub embeds them (no scripts, no external fonts).
const root = document.getElementById('root')!

async function render() {
  const files: string[] = await (await fetch('/svg/index.json')).json()
  const bust = Date.now()
  root.innerHTML = ['light', 'dark']
    .map(
      (scheme) =>
        `<section class="${scheme}">${files
          .map((f) => `<figure><figcaption>${f} · ${scheme}</figcaption><img src="/svg/${f}?t=${bust}" alt="${f}"></figure>`)
          .join('')}</section>`,
    )
    .join('')
}

document.getElementById('replay')!.addEventListener('click', render)
render()
