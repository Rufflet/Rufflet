export type ThemeName = 'dark' | 'light'

export interface Theme {
  name: ThemeName
  bg: string
  border: string
  bar: string
  text: string
  muted: string
  accent: string
  green: string
  cyan: string
  purple: string
  yellow: string
  gradient: [string, string]
  dots: [string, string, string]
}

export const themes: Record<ThemeName, Theme> = {
  dark: {
    name: 'dark',
    bg: '#0f131a',
    border: '#2a313c',
    bar: '#151a22',
    text: '#e6edf3',
    muted: '#7d8590',
    accent: '#e8825f',
    green: '#3fb950',
    cyan: '#56d4dd',
    purple: '#bc8cff',
    yellow: '#e3b341',
    gradient: ['#ff8a65', '#c084fc'],
    dots: ['#ff5f57', '#febc2e', '#28c840'],
  },
  light: {
    name: 'light',
    bg: '#ffffff',
    border: '#d0d7de',
    bar: '#f6f8fa',
    text: '#1f2328',
    muted: '#59636e',
    accent: '#c4532f',
    green: '#1a7f37',
    cyan: '#0a7ea4',
    purple: '#8250df',
    yellow: '#9a6700',
    gradient: ['#e2603f', '#8b5cf6'],
    dots: ['#ff5f57', '#febc2e', '#28c840'],
  },
}

/** Monospace metrics shared by every component (JetBrains Mono advance = 0.6em). */
export const metrics = {
  fontSize: 14,
  charWidth: 14 * 0.6,
  lineHeight: 21,
}
