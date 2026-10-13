<script setup lang="ts">
import { computed } from 'vue'
import { metrics } from '../theme'
import Line from './Line.vue'

/**
 * Prompt + command that "types itself": a background-coloured cover with the cursor
 * slides right in `steps(n)`, uncovering one character per step.
 */
const props = defineProps<{
  x: number
  y: number
  cwd: string
  command: string
  start: number
  charDelay: number
}>()

const promptText = computed(() => `${props.cwd} ❯ `)
const cmdX = computed(() => props.x + [...promptText.value].length * metrics.charWidth)
const n = computed(() => [...props.command].length)
const width = computed(() => n.value * metrics.charWidth)
const typeStyle = computed(
  () =>
    `--w:${width.value}px;animation:type ${(n.value * props.charDelay).toFixed(2)}s steps(${n.value}) ${props.start}s forwards`,
)
const doneAt = computed(() => props.start + n.value * props.charDelay + 0.25)
</script>

<template>
  <g>
    <Line :x="x" :y="y" :segs="[[cwd, 'c'], [' ❯ ', 'g']]" />
    <Line :x="cmdX" :y="y" :segs="[[command]]" />
    <g class="typer" :style="`animation:out .01s ${doneAt.toFixed(2)}s forwards`">
      <g :style="typeStyle">
        <rect :x="cmdX" :y="y - 15" :width="width + 20" :height="20" class="bg" />
        <rect class="blink ac" :x="cmdX" :y="y - 14" :width="metrics.charWidth" :height="18" />
      </g>
    </g>
  </g>
</template>
