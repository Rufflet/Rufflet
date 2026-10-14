<script setup lang="ts">
import { metrics } from '../theme'
import { at } from '../styles'
import Line from './Line.vue'

/** Classic neofetch layout: gradient ASCII logo on the left, key/value facts on the right. */
const props = defineProps<{
  x: number
  y: number
  user: string
  facts: [string, string][]
  start: number
}>()

// Pixel-art "R" drawn with rects: crisper than box-drawing glyphs, which leave seams.
const logo = [
  '#####.',
  '##..##',
  '##..##',
  '#####.',
  '##.##.',
  '##..##',
  '##..##',
]
const cell = 13
const gap = 2
const lh = metrics.lineHeight
const cw = metrics.charWidth
const infoX = props.x + 14 * cw
const keyWidth = Math.max(...props.facts.map(([k]) => k.length)) + 2
const logoTop = props.y - 14 + ((props.facts.length + 2) * lh - logo.length * (cell + gap)) / 2
const pixels = logo.flatMap((row, r) => [...row].flatMap((ch, c) => (ch === '#' ? [{ r, c }] : [])))
const step = 0.11
</script>

<template>
  <g>
    <defs>
      <linearGradient id="logo-grad" gradientUnits="userSpaceOnUse" :x1="x" :y1="logoTop" :x2="x + 6 * (cell + gap)" :y2="logoTop + logo.length * (cell + gap)">
        <stop offset="0" class="s0" />
        <stop offset="1" class="s1" />
      </linearGradient>
    </defs>
    <rect
      v-for="px in pixels"
      :key="`${px.r}-${px.c}`"
      class="a logo"
      :style="at(start + px.r * 0.06 + px.c * 0.02)"
      :x="x + px.c * (cell + gap)"
      :y="logoTop + px.r * (cell + gap)"
      :width="cell"
      :height="cell"
      rx="2"
    />

    <Line class="a" :style="at(start)" :x="infoX" :y="y" :segs="[[user.split('@')[0], 'ac b'], ['@', 'm'], [user.split('@')[1], 'ac b']]" />
    <Line class="a" :style="at(start + step)" :x="infoX" :y="y + lh" :segs="[['─'.repeat(user.length), 'm']]" />
    <Line
      v-for="([key, value], i) in facts"
      :key="key"
      class="a"
      :style="at(start + (i + 2) * step)"
      :x="infoX"
      :y="y + (i + 2) * lh"
      :segs="key === 'status' ? [[key.padEnd(keyWidth), 'p b'], ['● ', 'g'], [value]] : [[key.padEnd(keyWidth), 'p b'], [value]]"
    />

  </g>
</template>
