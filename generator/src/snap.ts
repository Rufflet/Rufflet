/**
 * Renders README.md through GitHub's own Markdown API (same sanitizer as the profile page),
 * then screenshots it in headless Chromium at several moments of the animation, in both themes
 * and at desktop + phone widths. Output: generator/.snap/*.png
 *
 * Usage: npm run snap  (needs `gh` auth and a Playwright Chromium in ~/.cache/ms-playwright)
 */
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = fileURLToPath(new URL('../../', import.meta.url))
const outDir = fileURLToPath(new URL('../.snap/', import.meta.url))
await mkdir(outDir, { recursive: true })

const html = execFileSync('gh', ['api', 'markdown', '-f', `text=${await readFile(root + 'README.md', 'utf8')}`, '-f', 'mode=markdown', '-f', 'context=Rufflet/Rufflet'], { encoding: 'utf8' })
const css = await readFile(fileURLToPath(new URL('../node_modules/github-markdown-css/github-markdown.css', import.meta.url)), 'utf8')
const page = (scheme: 'light' | 'dark') => `<!doctype html><html><head><meta charset="utf-8">
<meta name="color-scheme" content="${scheme}"><base href="file://${root}">
<style>${css} body{margin:0;background:${scheme === 'dark' ? '#0d1117' : '#ffffff'}} .markdown-body{box-sizing:border-box;max-width:880px;margin:0 auto;padding:24px}</style>
</head><body><article class="markdown-body">${html}</article></body></html>`

const browsersDir = `${homedir()}/.cache/ms-playwright/`
const chromiumDir = (await readdir(browsersDir)).filter((d) => /^chromium-\d+$/.test(d)).sort().at(-1)
const executablePath = `${browsersDir}${chromiumDir}/chrome-linux64/chrome`
const browser = await chromium.launch({ executablePath })

const moments = process.argv.includes('--final') ? [9] : [1.4, 3, 4.6, 9]
for (const scheme of ['dark', 'light'] as const) {
  const file = `${outDir}readme-${scheme}.html`
  await writeFile(file, page(scheme))
  for (const [label, width] of [['desktop', 930], ['phone', 390]] as const) {
    const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width, height: 900 }, deviceScaleFactor: 2 })
    const tab = await ctx.newPage()
    const t0 = Date.now()
    await tab.goto(`file://${file}`)
    for (const s of label === 'phone' ? [9] : moments) {
      await tab.waitForTimeout(Math.max(0, s * 1000 - (Date.now() - t0)))
      const name = `${scheme}-${label}-${s}s.png`
      await tab.screenshot({ path: outDir + name, fullPage: s >= 9 })
      console.log(name)
    }
    await ctx.close()
  }
}
await browser.close()
