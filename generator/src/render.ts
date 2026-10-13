import { createSSRApp, h, type Component } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { fontFaceCss } from './font'
import { baseCss, FONT_SLOT } from './styles'
import { links, projects } from './profile.config'
import TerminalSession from './components/TerminalSession.vue'
import ProjectCard from './components/ProjectCard.vue'
import LinkButton from './components/LinkButton.vue'

export interface Output {
  /** File name inside ../assets, e.g. `terminal.svg`. */
  file: string
  render: () => Promise<string>
}

const decode = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

async function renderSvg(component: Component, props: Record<string, unknown> = {}): Promise<string> {
  let svg = await renderToString(createSSRApp({ render: () => h(component, props) }))
  svg = svg
    // Vue leaves fragment/v-if markers as comments; they're noise in a static asset.
    .replace(/<!--[\s\S]*?-->/g, '')
    // SSR lowercases fallthrough attrs on the root <svg>; XML is case-sensitive.
    .replace(' viewbox=', ' viewBox=')
    // SFC templates can't contain <style>, so the stylesheet is injected here.
    .replace(/^(<svg\b[^>]*>)/, `$1<style>${baseCss()}</style>`)
  const visibleText = decode([...svg.matchAll(/<(?:text|tspan)\b[^>]*>([^<]*)/g)].map((m) => m[1]).join(''))
  const bold = /class="(?:[^"]* )?b(?: [^"]*)?"/.test(svg)
  return `<?xml version="1.0" encoding="UTF-8"?>\n${svg.replace(FONT_SLOT, await fontFaceCss(visibleText, { bold }))}\n`
}

export const outputs: Output[] = [
  { file: 'terminal.svg', render: () => renderSvg(TerminalSession) },
  ...projects
    .filter((p) => p.visible)
    .map((project) => ({ file: `project-${project.slug}.svg`, render: () => renderSvg(ProjectCard, { project }) })),
  ...links
    .filter((l) => l.visible)
    .map((link) => ({ file: `link-${link.slug}.svg`, render: () => renderSvg(LinkButton, { link }) })),
]
