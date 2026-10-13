<script setup lang="ts">
import { metrics } from '../theme'
import { at } from '../styles'
import type { Project } from '../profile.config'
import Line from './Line.vue'

/** A project tile in the same terminal language: path header, title, wrapped blurb, tag pills. */
const props = defineProps<{ project: Project }>()

const W = 410
const X = 22
const cw = metrics.charWidth
const maxChars = Math.floor((W - X * 2) / cw)

function wrap(text: string, width: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > width) {
      lines.push(line)
      line = word
    } else line = line ? `${line} ${word}` : word
  }
  return line ? [...lines, line] : lines
}

const blurb = wrap(props.project.description, maxChars)
const y = { head: 34, title: 66, blurb: 90 }
const tagsY = y.blurb + blurb.length * metrics.lineHeight + 14
const H = tagsY + 30

let tagX = X
const tags = props.project.tags.map((tag) => {
  const w = tag.length * 7.2 + 18
  const pill = { tag, x: tagX, w }
  tagX += w + 8
  return pill
})

</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="`${project.name}: ${project.title}. ${project.description}`">
    <rect x="0.5" y="0.5" :width="W - 1" :height="H - 1" rx="10" class="bg bd" />
    <rect x="0.5" y="16" width="3" :height="H - 32" rx="1.5" class="ac" />
    <Line class="a" :style="at(0.1)" :x="X" :y="y.head" :segs="[['~/projects/', 'm'], [project.name, 'ac b']]" />
    <text class="a m" :style="at(0.1)" :x="W - X" :y="y.head" text-anchor="end">↗</text>
    <line :style="at(0.15)" :x1="X" :x2="W - X" :y1="y.head + 11" :y2="y.head + 11" class="a bd" stroke-dasharray="3 4" />
    <Line class="a" :style="at(0.25)" :x="X" :y="y.title" :segs="[[project.title, 'b']]" />
    <Line v-for="(l, i) in blurb" :key="i" class="a" :style="at(0.35 + i * 0.08)" :x="X" :y="y.blurb + i * metrics.lineHeight" :segs="[[l, 'm']]" />
    <g v-for="(p, i) in tags" :key="p.tag" class="a" :style="at(0.5 + i * 0.08)">
      <rect :x="p.x + 0.5" :y="tagsY - 15.5" :width="p.w" height="22" rx="11" class="nf bd" />
      <text class="c sm" :x="p.x + 9.5" :y="tagsY">{{ p.tag }}</text>
    </g>
  </svg>
</template>
