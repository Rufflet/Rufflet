// Single source of truth for everything rendered into the profile.
// Edit this file, then run `npm run build` to regenerate ../assets/*.svg and the README blocks.

export interface Project {
  slug: string
  /** `oss` cards show a ~/projects path; `live` cards show the product's domain with a live dot. */
  kind: 'oss' | 'live'
  name: string
  title: string
  description: string
  tags: string[]
  href: string
  /** Set to false to keep a card out of the README (e.g. while the repo is private). */
  visible: boolean
}

export interface Link {
  slug: string
  label: string
  href: string
  /** The one call to action that gets the accent treatment. */
  primary?: boolean
  visible: boolean
}

/** Tags our own product links so visits from this profile show up in analytics. */
const utm = (url: string, campaign: string) => {
  const u = new URL(url)
  u.searchParams.set('utm_source', 'github')
  u.searchParams.set('utm_medium', 'profile')
  u.searchParams.set('utm_campaign', campaign)
  return u.toString()
}

export const profile = {
  login: 'Rufflet',
  name: 'Alex Ershov',
  host: 'rufflet',
  prompt: 'claude "who is rufflet?"',
  tool: { name: 'github.profile', args: 'user: "Rufflet"', result: 'fetched profile · 4 live products · 2 open source' },
  reply: "Here's who you're looking at:",
  facts: [
    ['role', 'full-stack TypeScript · AI integrations'],
    ['stack', 'TypeScript · Vue / Nuxt · Node'],
    ['ai', 'MCP servers · agents · in-house AI tooling'],
    ['data', 'AI modules for MySQL / PostgreSQL / Oracle'],
    ['viz', 'd3.js'],
    ['at', 'ValidStack — lead engineer'],
    ['status', 'open to projects via ValidStack'],
  ] as [string, string][],
  /** Closing hint from the agent — points at the product we most want people to try. */
  tip: [
    [['Tip: his main project is '], ['md2file.com', 'ac b'], [' —']],
    [['Markdown → PDF / HTML right in the browser.']],
  ] as [string, string?][][],
}

export const shipped: Project[] = [
  {
    slug: 'md2file',
    kind: 'live',
    name: 'md2file.com',
    title: 'Markdown → PDF / HTML, as a SaaS',
    description: 'Online editor with live preview, Mermaid, LaTeX and AI writing tools.',
    tags: ['SaaS', 'Vue', 'AI'],
    href: utm('https://md2file.com/', 'md2file'),
    visible: true,
  },
  {
    slug: 'md2pdf-chrome',
    kind: 'live',
    name: 'Markdown to PDF',
    title: 'Chrome extension: .md → PDF',
    description: 'Mermaid, KaTeX and CJK in the browser. Free, no sign-up.',
    tags: ['Chrome', 'extension'],
    href: utm('https://chromewebstore.google.com/detail/markdown-to-pdf-converter/mcajoeddbjfiaddbklgndfgidjghmgel', 'md2pdf_extension'),
    visible: true,
  },
  {
    slug: 'ai-chat-exporter',
    kind: 'live',
    name: 'AI Chat Exporter',
    title: 'Save AI chats as clean PDFs',
    description: 'ChatGPT, Claude, Gemini, Grok, DeepSeek and more. Chrome + Safari for Mac.',
    tags: ['Chrome', 'Safari', 'AI'],
    // Landing page links to both the Chrome Web Store and the Mac App Store.
    href: utm('https://md2file.com/ai-chat-exporter/', 'ai_chat_exporter'),
    visible: true,
  },
  {
    slug: 'casascalea',
    kind: 'live',
    name: 'casascalea.it',
    title: 'Real-estate platform in Calabria',
    description: 'Listings with map search and favorites in EN / RU / IT, managed in Strapi.',
    tags: ['Nuxt', 'Strapi', 'client'],
    href: 'https://casascalea.it',
    visible: true,
  },
]

export const projects: Project[] = [
  {
    slug: 'mysql-legacy-mcp',
    kind: 'oss',
    name: 'mysql-legacy-mcp',
    title: 'MCP server for legacy MySQL 5.0–5.6',
    description: 'Schema inspection & SELECT by default, opt-in writes. Verified on 5.0–8.0.',
    tags: ['MCP', 'Node', 'npm'],
    href: 'https://github.com/Rufflet/mysql-legacy-mcp',
    visible: true,
  },
  {
    slug: 'svg-bpmn-js',
    kind: 'oss',
    name: 'svg.bpmn.js',
    title: 'BPMN-like flowcharts in pure SVG',
    description: 'A JavaScript library for building process diagrams.',
    tags: ['SVG', 'JavaScript', 'diagrams'],
    href: 'https://github.com/Rufflet/svg.bpmn.js',
    visible: true,
  },
  {
    slug: 'win31-messenger',
    kind: 'oss',
    name: 'retro-messenger',
    title: 'A modern messenger for Windows 3.1',
    description: 'What would chat look like if it shipped in 1992?',
    tags: ['TypeScript', 'retro', 'UI'],
    href: 'https://github.com/Rufflet/windows-3.1-retro-style-messenger',
    visible: false, // repo is private — flip when it's public
  },
]

export const links: Link[] = [
  { slug: 'validstack', label: 'work with me → validstack.pro', href: utm('https://validstack.pro/', 'profile_cta'), primary: true, visible: true },
  { slug: 'upwork', label: 'ValidStack on Upwork', href: 'https://www.upwork.com/agencies/validstack/', visible: true },
  { slug: 'telegram', label: 'telegram', href: 'https://t.me/notonlycodes', visible: true },
  { slug: 'observable', label: 'observable', href: 'https://observablehq.com/@rufflet', visible: true },
]
