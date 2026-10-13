import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

// Vite compiles the .vue SFCs for SSR; we only use it as a module loader here.
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { outputs } = (await vite.ssrLoadModule('/src/render.ts')) as typeof import('./render')
  const outDir = fileURLToPath(new URL('../../assets/', import.meta.url))
  await mkdir(outDir, { recursive: true })
  // Drop stale files (e.g. a project that was hidden) so assets/ mirrors the config.
  for (const f of await readdir(outDir)) if (f.endsWith('.svg')) await rm(outDir + f)
  for (const o of outputs) {
    const svg = await o.render()
    await writeFile(outDir + o.file, svg)
    console.log(`${o.file.padEnd(40)} ${(svg.length / 1024).toFixed(1)} KB`)
  }
  const { updateReadme } = (await vite.ssrLoadModule('/src/readme.ts')) as typeof import('./readme')
  const readmePath = fileURLToPath(new URL('../../README.md', import.meta.url))
  await writeFile(readmePath, updateReadme(await readFile(readmePath, 'utf8')))
  console.log('README.md blocks updated')
} finally {
  await vite.close()
}
