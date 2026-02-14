<script setup lang="ts">
import { type Sticker } from '../score'

interface Props {
  sticker: Sticker
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex w-fit flex-row items-center space-x-1 rounded-full border px-1 py-0.5 text-nowrap capitalize"
    :class="{
      'border-amber-300 bg-amber-600/10 text-amber-300': sticker === 'gold',
      'border-orange-300 bg-orange-600/10 text-orange-300': sticker === 'orange',
      'border-purple-300 bg-purple-600/10 text-purple-300': sticker === 'purple',
      'border-blue-300 bg-blue-600/10 text-blue-300': sticker === 'blue',
      'border-zinc-400 bg-zinc-600/10 text-zinc-400': sticker === 'black',
      'border-green-300 bg-green-600/10 text-green-300': sticker === 'green',
      'border-red-300 bg-red-600/10 text-red-300': sticker === 'red',
      'border-neutral-300 bg-neutral-600/10 text-neutral-300': sticker === 'white',
    }"
  >
    <i-charm-sticky-note />
    <span>{{ sticker }} sticker</span>
  </div>
</template>
