// Single source of truth for everything rendered into the profile.
// Edit this file, then run `npm run build` to regenerate ../assets/*.svg.

export interface Project {
  slug: string
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
  visible: boolean
}

export const profile = {
  login: 'Rufflet',
  name: 'Alex Ershov',
  host: 'rufflet',
  prompt: 'claude "who is rufflet?"',
  tool: { name: 'github.profile', args: 'user: "Rufflet"', result: 'fetched profile · 4 pinned repos · 1 org' },
  reply: "Here's who you're looking at:",
  facts: [
    ['role', 'Forward Deployed Engineer · full-stack · AI'],
    ['stack', 'TypeScript · Vue / Nuxt · Node · MCP'],
    ['builds', 'MCP servers, AI integrations, dev tools'],
    ['at', 'ValidStack — validstack.pro'],
    ['likes', 'maps & graph data'],
    ['status', 'open to projects'],
  ] as [string, string][],
}

export const projects: Project[] = [
  {
    slug: 'mysql-legacy-mcp',
    name: 'mysql-legacy-mcp',
    title: 'MCP server for legacy MySQL 5.0–5.6',
    description: 'Schema inspection & SELECT by default, opt-in writes. Verified on 5.0–8.0.',
    tags: ['MCP', 'Node', 'npm'],
    href: 'https://github.com/Rufflet/mysql-legacy-mcp',
    visible: true,
  },
  {
    slug: 'md2file',
    name: 'md2file',
    title: 'Markdown → PDF browser extension',
    description: 'Mermaid, KaTeX math and CJK out of the box. Built at ValidStack.',
    tags: ['Chrome', 'TypeScript', 'ValidStack'],
    href: 'https://md2file.com/extension',
    visible: true,
  },
  {
    slug: 'svg-bpmn-js',
    name: 'svg.bpmn.js',
    title: 'BPMN-like flowcharts in pure SVG',
    description: 'A JavaScript library for building process diagrams.',
    tags: ['SVG', 'JavaScript', 'diagrams'],
    href: 'https://github.com/Rufflet/svg.bpmn.js',
    visible: true,
  },
  {
    slug: 'profile',
    name: 'rufflet',
    title: 'This profile, rendered by Vue',
    description: 'Vue SSR → animated, theme-aware SVG. No JS ships to GitHub.',
    tags: ['Vue', 'TypeScript', 'SVG'],
    href: 'https://github.com/Rufflet/Rufflet',
    visible: true,
  },
  {
    slug: 'win31-messenger',
    name: 'retro-messenger',
    title: 'A modern messenger for Windows 3.1',
    description: 'What would chat look like if it shipped in 1992?',
    tags: ['TypeScript', 'retro', 'UI'],
    href: 'https://github.com/Rufflet/windows-3.1-retro-style-messenger',
    visible: false, // repo is private — flip when it's public
  },
]

// TODO(owner): fill in hrefs for email / linkedin / x / telegram and set visible: true.
export const links: Link[] = [
  { slug: 'upwork', label: 'hire me on upwork', href: 'https://www.upwork.com/freelancers/~0175333b8b4aefa403/', visible: true },
  { slug: 'validstack', label: 'validstack.pro', href: 'https://validstack.pro', visible: true },
  { slug: 'observable', label: 'observable', href: 'https://observablehq.com/@rufflet', visible: true },
  { slug: 'email', label: 'email', href: '', visible: false },
  { slug: 'linkedin', label: 'linkedin', href: '', visible: false },
  { slug: 'x', label: 'x', href: '', visible: false },
  { slug: 'telegram', label: 'telegram', href: '', visible: false },
]
