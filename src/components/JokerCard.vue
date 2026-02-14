<script setup lang="ts">
import type { Joker } from '@/jokers'
import { jokerAssets, stickerAssets } from '../assets'
import { computed } from 'vue'
import { getSticker } from '@/score'
import { store } from '@/store'

interface Props {
  joker: Joker
  size: 'sm' | 'lg'
}

const props = defineProps<Props>()

const numGuesses = computed(() => store.previousWins?.[props.joker.name]?.numGuesses)
const sticker = computed(() => (numGuesses.value ? getSticker(numGuesses.value) : null))
</script>

<template>
  <Card class="relative">
    <img
      v-if="sticker"
      :src="stickerAssets[`/src/assets/stickers/${sticker}.png`]?.default"
      class="pixelated animate-shimmer absolute"
      :class="{
        'top-0.75 right-0.75 size-3 sm:top-1 sm:right-1 sm:size-4': size === 'sm',
        'top-2 right-2 size-6': size === 'lg',
      }"
    />
    <img
      :src="jokerAssets[`/src/assets/jokers/${joker.name}.png`]?.default"
      :class="{ 'w-16': size === 'sm', 'w-24': size === 'lg' }"
    />
  </Card>
</template>
