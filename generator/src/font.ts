import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import subsetFont from 'subset-font'

const require = createRequire(import.meta.url)
const fontDir = require.resolve('jetbrains-mono/package.json').replace(/package\.json$/, 'fonts/webfonts/')

const sources = {
  400: 'JetBrainsMonoNL-Regular.woff2',
  700: 'JetBrainsMonoNL-Bold.woff2',
} as const

const cache = new Map<string, Buffer>()
async function load(file: string) {
  if (!cache.has(file)) cache.set(file, await readFile(fontDir + file))
  return cache.get(file)!
}

export const FONT_FAMILY = 'RuffletMono'

/**
 * Builds @font-face rules with JetBrains Mono subset to exactly the glyphs in `text`,
 * inlined as base64 — images rendered through GitHub's camo proxy can't fetch fonts.
 */
export async function fontFaceCss(text: string, { bold = true } = {}): Promise<string> {
  const chars = [...new Set(text)].join('') + ' '
  const rules = await Promise.all(
    Object.entries(sources)
      .filter(([weight]) => bold || weight !== '700')
      .map(async ([weight, file]) => {
        const woff2 = await subsetFont(await load(file), chars, { targetFormat: 'woff2' })
        return `@font-face{font-family:${FONT_FAMILY};font-weight:${weight};src:url(data:font/woff2;base64,${woff2.toString('base64')}) format("woff2")}`
      }),
  )
  return rules.join('')
}
