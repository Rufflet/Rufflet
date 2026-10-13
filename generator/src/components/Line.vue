<script setup lang="ts">
import { computed } from 'vue'
import { metrics } from '../theme'

/** One terminal row: `[text, className]` segments laid out on the monospace grid. */
const props = defineProps<{ x: number; y: number; segs: [string, string?][] }>()

const placed = computed(() => {
  let col = 0
  return props.segs.map(([text, cls]) => {
    const seg = { text, cls, x: +(props.x + col * metrics.charWidth).toFixed(2) }
    col += [...text].length
    return seg
  })
})
</script>

<template>
  <text :y="y"><tspan v-for="(s, i) in placed" :key="i" :x="s.x" :class="s.cls">{{ s.text }}</tspan></text>
</template>
