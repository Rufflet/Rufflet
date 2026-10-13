import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

/** Serves freshly rendered SVGs at /svg/<file> and reloads the preview on any source change. */
function svgPreview(): Plugin {
  return {
    name: 'svg-preview',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/svg/')) return next()
        try {
          const { outputs } = (await server.ssrLoadModule('/src/render.ts')) as typeof import('./src/render')
          const file = decodeURIComponent(req.url.slice(5).split('?')[0])
          if (file === 'index.json') {
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify(outputs.map((o) => o.file)))
          }
          const out = outputs.find((o) => o.file === file)
          if (!out) return next()
          res.setHeader('Content-Type', 'image/svg+xml')
          res.end(await out.render())
        } catch (e) {
          next(e)
        }
      })
    },
    handleHotUpdate({ server, file }) {
      if (file.includes('/src/')) server.ws.send({ type: 'full-reload' })
    },
  }
}

export default defineConfig({
  root: '.',
  plugins: [vue(), svgPreview()],
  server: { open: '/preview/' },
})
