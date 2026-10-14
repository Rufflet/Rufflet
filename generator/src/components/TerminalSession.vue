<script setup lang="ts">
import { metrics } from '../theme'
import { at } from '../styles'
import { profile } from '../profile.config'
import Window from './Window.vue'
import TypedCommand from './TypedCommand.vue'
import ToolCall from './ToolCall.vue'
import NeofetchCard from './NeofetchCard.vue'
import Line from './Line.vue'

/** Hero SVG: a short, one-shot agent session that ends on a neofetch-style card. */

const W = 840
const X = 26
const lh = metrics.lineHeight
const cwd = `~/${profile.host}`

// Layout: one entry per terminal row (null = blank row).
const top = 66
const row = (n: number) => top + n * lh
const cardRows = profile.facts.length + 2

// Timeline (seconds). Everything is derived from these so retiming is one edit.
const charDelay = 0.055
const typeStart = 0.7
const typed = typeStart + [...profile.prompt].length * charDelay
const t = {
  tool: typed + 0.45,
  toolDone: typed + 1.5,
  reply: typed + 1.95,
  card: typed + 2.35,
}
const tipRow = 7 + cardRows + 1
const tipAt = t.card + cardRows * 0.11 + 0.6
const finalRow = tipRow + profile.tip.length + 1
const finalAt = tipAt + 0.7
const H = row(finalRow) + 26

</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="W"
    :height="H"
    :viewBox="`0 0 ${W} ${H}`"
    role="img"
    :aria-label="`${profile.name}: ${profile.facts.map(([k, v]) => `${k} ${v}`).join(', ')}`"
  >
    <Window :width="W" :height="H" :title="`${profile.host} — claude — zsh`">
      <TypedCommand :x="X" :y="row(0)" :cwd="cwd" :command="profile.prompt" :start="typeStart" :char-delay="charDelay" />
      <ToolCall
        :x="X"
        :y="row(2)"
        :name="profile.tool.name"
        :args="profile.tool.args"
        :result="profile.tool.result"
        :start="t.tool"
        :done="t.toolDone"
      />
      <Line class="a" :style="at(t.reply)" :x="X" :y="row(5)" :segs="[['●', 'ac'], [' ' + profile.reply]]" />
      <NeofetchCard :x="X + 24" :y="row(7)" :user="`alex@${profile.host}`" :facts="profile.facts" :start="t.card" />
      <g class="a" :style="at(tipAt)">
        <Line
          v-for="(segs, i) in profile.tip"
          :key="i"
          :x="X"
          :y="row(tipRow + i)"
          :segs="i === 0 ? [['●', 'ac'], [' '], ...segs] : [['  '], ...segs]"
        />
      </g>
      <g class="a" :style="at(finalAt)">
        <Line :x="X" :y="row(finalRow)" :segs="[[cwd, 'c'], [' ❯ ', 'g']]" />
        <rect class="blink ac" :x="X + (cwd.length + 3) * metrics.charWidth" :y="row(finalRow) - 14" :width="metrics.charWidth" height="18" />
      </g>
    </Window>
  </svg>
</template>
