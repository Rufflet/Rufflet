<script setup lang="ts">
import { metrics } from '../theme'
import type { Link } from '../profile.config'
import Line from './Line.vue'

/** Compact `❯ label ↗` pill used for the contact row. */
const props = defineProps<{ link: Link }>()

const pad = 14
const W = Math.round(pad * 2 + (props.link.label.length + 4) * metrics.charWidth)
const H = 34
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="link.label">
    <rect x="0.5" y="0.5" :width="W - 1" :height="H - 1" rx="8" :class="link.primary ? 'bg acs' : 'bg bd'" />
    <Line :x="pad" :y="22" :segs="link.primary ? [['❯ ', 'ac b'], [link.label, 'b'], [' ↗', 'ac']] : [['❯ ', 'g'], [link.label], [' ↗', 'm']]" />
  </svg>
</template>
