<script setup lang="ts">
import { metrics } from '../theme'
import { at } from '../styles'
import Line from './Line.vue'

/** `● tool(args)` → transient "running…" → `└ result`, mimicking an agent's MCP call. */
const props = defineProps<{
  x: number
  y: number
  name: string
  args: string
  result: string
  start: number
  done: number
}>()

const lh = metrics.lineHeight
const cw = metrics.charWidth
</script>

<template>
  <g>
    <g class="a" :style="at(start)">
      <Line :x="x" :y="y" :segs="[['●', 'm']]" />
      <text class="pulse ac" :x="x" :y="y">●</text>
      <Line :x="x + cw * 2" :y="y" :segs="[[name, 'b'], ['(', 'm'], [args, 'm'], [')', 'm'], ['  mcp', 'p']]" />
    </g>
    <rect :x="x - 1" :y="y - 15" :width="cw + 2" :height="20" class="a bg" :style="at(done)" />
    <Line class="a" :style="at(done)" :x="x" :y="y" :segs="[['●', 'g']]" />
    <Line class="tmp" :style="`animation-delay:${(start + 0.15).toFixed(2)}s,${(done - 0.05).toFixed(2)}s`" :x="x" :y="y + lh" :segs="[['  └ ', 'm'], ['running…', 'y']]" />
    <Line class="a" :style="at(done)" :x="x" :y="y + lh" :segs="[['  └ ', 'm'], ['✓ ', 'g'], [result, 'm']]" />
  </g>
</template>
