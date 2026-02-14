<script setup lang="ts">
import { type Rarity } from '../jokers'

interface Props {
  rarity: Rarity
}

defineProps<Props>()
</script>

<template>
  <div
    class="w-fit rounded-full border px-1 py-0.5"
    :class="{
      'border-blue-300 bg-blue-600/10 text-blue-300': rarity === 'Common',
      'border-green-300 bg-green-600/10 text-green-300': rarity === 'Uncommon',
      'border-red-300 bg-red-600/10 text-red-300': rarity === 'Rare',
      'border-fuchsia-300 bg-fuchsia-600/10 text-fuchsia-300': rarity === 'Legendary',
    }"
  >
    <span>{{ rarity }}</span>
  </div>
</template>
