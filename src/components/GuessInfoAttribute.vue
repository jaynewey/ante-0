<script setup lang="ts">
import type { OverlapType } from '@/score'
import Correctness from './Correctness.vue'

interface Props {
  name: string
  match: OverlapType
}

defineProps<Props>()
</script>

<template>
  <div class="group relative" tabindex="0">
    <div
      class="relative flex flex-auto items-center rounded-lg p-2 transition-all duration-300"
      :class="{ 'hover:bg-slate-950/50 active:bg-slate-950/75': match !== 'none' }"
    >
      <p class="truncate text-xs sm:text-sm">{{ name }}</p>
      <div class="ml-auto">
        <Correctness :match="match" />
      </div>
    </div>
    <div
      v-if="match !== 'none'"
      class="absolute right-0 bottom-full z-10 mb-1 hidden rounded-lg border border-slate-700 bg-slate-950/95 p-2 text-center text-slate-300 shadow-xl shadow-slate-700/50 backdrop-blur-lg group-hover:block group-focus:block"
    >
      <slot />
    </div>
  </div>
</template>
