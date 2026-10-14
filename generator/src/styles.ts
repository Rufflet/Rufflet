import { FONT_FAMILY } from './font'
import { metrics, themes, type Theme } from './theme'

/** Placeholder replaced with the subset @font-face rules after rendering. */
export const FONT_SLOT = '/*@font-face*/'

const vars = (t: Theme) =>
  `--bg:${t.bg};--border:${t.border};--bar:${t.bar};--text:${t.text};--muted:${t.muted};--accent:${t.accent};` +
  `--green:${t.green};--cyan:${t.cyan};--purple:${t.purple};--yellow:${t.yellow};--g0:${t.gradient[0]};--g1:${t.gradient[1]}`

/**
 * Shared stylesheet for every generated SVG.
 *
 * Each SVG carries both palettes and picks one with prefers-color-scheme, so it can sit in a
 * plain `<a><img></a>` — GitHub mangles links around `<picture>`, which would break clickable cards.
 *
 * Everything that animates starts hidden (`.a`) and is revealed with `animation-delay`;
 * reduced-motion users get the final frame immediately.
 */
export function baseCss(): string {
  return `${FONT_SLOT}
:root{${vars(themes.light)}}
@media (prefers-color-scheme:dark){:root{${vars(themes.dark)}}}
text{font-family:${FONT_FAMILY},ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:${metrics.fontSize}px;fill:var(--text);white-space:pre}
.b{font-weight:700}.sm{font-size:12px}
.m{fill:var(--muted)}.ac{fill:var(--accent)}.g{fill:var(--green)}.c{fill:var(--cyan)}.p{fill:var(--purple)}.y{fill:var(--yellow)}.t{fill:var(--text)}
.bg{fill:var(--bg)}.bar{fill:var(--bar)}.bd{stroke:var(--border)}.acs{stroke:var(--accent);stroke-width:1.5}.nf{fill:none}
.logo{fill:url(#logo-grad)}.s0{stop-color:var(--g0)}.s1{stop-color:var(--g1)}
.a{opacity:0;animation:in .32s ease-out forwards}
.tmp{opacity:0;animation:in .2s ease-out forwards,out .15s ease-in forwards}
.blink{animation:blink 1.06s steps(1) infinite}
.pulse{animation:pulse .7s ease-in-out infinite}
.live{animation:pulse 2.4s ease-in-out infinite}
@keyframes in{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@keyframes out{from{opacity:1}to{opacity:0}}
@keyframes blink{50%{opacity:0}}
@keyframes pulse{50%{opacity:.25}}
@keyframes type{to{transform:translateX(var(--w))}}
@media (prefers-reduced-motion:reduce){
  *{animation:none!important}
  .a{opacity:1}
  .tmp,.typer{display:none}
}`
}

/** `style` attribute for an element revealed at `delay` seconds. */
export const at = (delay: number) => `animation-delay:${delay.toFixed(2)}s`
