<script setup lang="ts">
import { type Rarity as RarityType } from '../jokers'
import Rarity from './Rarity.vue'

interface Props {
  rarity: RarityType
  rarities: Set<RarityType>
}

defineProps<Props>()
</script>

<template>
  <button
    @click="
      rarities.has(rarity) && rarities.size > 1 ? rarities.delete(rarity) : rarities.add(rarity)
    "
  >
    <Rarity
      :rarity="rarity"
      class="text-xs backdrop-blur-lg transition-all duration-200"
      :class="[
        {
          'border-dashed border-slate-500 bg-slate-700/10 text-slate-500': !rarities.has(rarity),
        },
        rarities.has(rarity) && rarities.size <= 1
          ? 'scale-100 cursor-not-allowed'
          : 'cursor-pointer hover:scale-105 active:scale-95',
      ]"
    />
  </button>
</template>
