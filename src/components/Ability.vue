<script setup lang="ts">
import type { AbilityType } from '@/jokers'

interface Props {
  ability: AbilityType
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex w-fit items-center space-x-1 rounded-full border px-1 py-0.5 text-nowrap"
    :class="{
      'border-rose-300 bg-rose-600/10 text-rose-300': ability === '+ Mult',
      'border-red-300 bg-red-600/10 text-red-300': ability === 'X Mult',
      'border-sky-300 bg-sky-600/10 text-sky-300': ability === '+ Chips',
      'border-indigo-300 bg-indigo-600/10 text-indigo-300': ability === 'Effect',
      'border-amber-300 bg-amber-600/10 text-amber-300': ability === 'Economy',
      'border-orange-300 bg-orange-600/10 text-orange-300': ability === 'Self Destruct',
      'border-lime-300 bg-lime-600/10 text-lime-300': ability === 'Retrigger',
      'border-teal-300 bg-teal-600/10 text-teal-300': ability === 'Scale',
      'border-stone-300 bg-stone-600/10 text-stone-300': ability === 'Conditional',
    }"
  >
    <i-charm-chevrons-up class="inline" v-if="ability === 'X Mult'" />
    <i-charm-north-star class="inline" v-if="ability === 'Effect'" />
    <i-charm-chart-line class="inline" v-if="ability === 'Economy'" />
    <i-charm-skull class="inline" v-else-if="ability === 'Self Destruct'" />
    <i-charm-refresh class="inline" v-else-if="ability === 'Retrigger'" />
    <i-charm-swap-vertical class="inline" v-else-if="ability === 'Scale'" />
    <i-charm-clipboard-tick class="inline" v-else-if="ability === 'Conditional'" />
    <span>{{ ability }}</span>
  </div>
</template>
