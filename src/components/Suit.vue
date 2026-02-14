<script setup lang="ts">
import type { Suit } from '@/jokers'

interface Props {
  suit: Suit
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex w-fit items-center gap-x-1 rounded-full border px-1 py-0.5"
    :class="{
      'bg-blue-rose/10 border-rose-300 text-rose-300': suit === 'Heart',
      'border-orange-300 bg-orange-600/10 text-orange-300': suit === 'Diamond',
      'border-indigo-300 bg-indigo-600/10 text-indigo-300': suit === 'Spade',
      'border-sky-300 bg-sky-600/10 text-sky-300': suit === 'Club',
    }"
  >
    <i-lucide-heart v-if="suit === 'Heart'" />
    <i-lucide-diamond v-else-if="suit === 'Diamond'" />
    <i-lucide-spade v-else-if="suit === 'Spade'" />
    <i-lucide-club v-else-if="suit === 'Club'" />
    <span>{{ suit }}s</span>
  </div>
</template>
