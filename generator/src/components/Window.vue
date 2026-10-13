<script setup lang="ts">
/** Rounded terminal window chrome: border, title bar, traffic-light dots, centered title. */
defineProps<{ width: number; height: number; title: string }>()

const dots = ['#ff5f57', '#febc2e', '#28c840']
</script>

<template>
  <g>
    <rect x="0.5" y="0.5" :width="width - 1" :height="height - 1" rx="10" class="bg bd" />
    <path :d="`M0.5 36V10.5a10 10 0 0 1 10-10h${width - 21}a10 10 0 0 1 10 10V36z`" class="bar" />
    <line x1="0.5" :x2="width - 0.5" y1="36" y2="36" class="bd" />
    <circle v-for="(c, i) in dots" :key="c" :cx="20 + i * 20" cy="18" r="6" :fill="c" />
    <text :x="width / 2" y="23" text-anchor="middle" class="m sm">{{ title }}</text>
    <slot />
  </g>
</template>
