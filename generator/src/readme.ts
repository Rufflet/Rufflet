import { links, projects } from './profile.config'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

// Plain <a><img>, not <picture>: GitHub wraps every <img> in its own link, which splits an
// outer <a> around <picture> and makes the card open the raw SVG. Theming lives inside each SVG.
const linkedImage = (href: string, file: string, alt: string, size: string) =>
  `<a href="${esc(href)}"><img alt="${esc(alt)}" src="assets/${file}" ${size}></a>`

const blocks: Record<string, () => string> = {
  projects: () =>
    projects
      .filter((p) => p.visible)
      .map((p) => linkedImage(p.href, `project-${p.slug}.svg`, `${p.name} — ${p.title}`, 'width="49%"'))
      .join('\n'),
  links: () =>
    links
      .filter((l) => l.visible)
      .map((l) => linkedImage(l.href, `link-${l.slug}.svg`, l.label, 'height="34"'))
      .join('\n'),
}

/** Rewrites every `<!-- name:start --> … <!-- name:end -->` block from the config. */
export function updateReadme(readme: string): string {
  return readme.replace(
    /(<!-- (\w+):start -->\n)[\s\S]*?(\n<!-- \2:end -->)/g,
    (whole, open: string, name: string, close: string) => (blocks[name] ? open + blocks[name]() + close : whole),
  )
}
