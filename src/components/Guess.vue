<script setup lang="ts">
import { getScoreColour, type Guess } from '../score'
import { computed } from 'vue'
import GuessInfo from './GuessInfo.vue'
import { store } from '@/store'

interface Props {
  guess: Guess
}

const props = defineProps<Props>()

const scorePercent = computed(() => Math.round(props.guess.score * 100))
const scoreColour = computed(() => getScoreColour(props.guess.score))

const expanded = computed(() => store.expandedJoker === props.guess.joker.name)
</script>

<template>
  <div
    class="w-full items-center gap-x-4 rounded-lg border text-sm backdrop-blur-sm"
    :class="[
      scorePercent === 100
        ? 'border-emerald-300 bg-emerald-950/25'
        : 'border-slate-950 bg-slate-950/25',
    ]"
  >
    <div
      class="flex flex-auto cursor-pointer items-center gap-x-4 rounded-t-lg p-4 transition-all duration-200 hover:bg-slate-950/50 active:bg-slate-950/75"
      :class="{ 'rounded-b-lg': !expanded }"
      @click="expanded ? (store.expandedJoker = null) : (store.expandedJoker = guess.joker.name)"
    >
      <div
        class="flex items-center justify-center gap-x-1 rounded-full border px-2 py-1 text-center font-bold"
        :class="{
          'border-red-300 bg-red-600/10 text-red-300': scoreColour === 'red',
          'border-amber-300 bg-amber-600/10 text-amber-300': scoreColour === 'amber',
          'border-emerald-300 bg-emerald-600/10 text-emerald-300': scoreColour === 'green',
        }"
      >
        <i-charm-tick v-if="scorePercent === 100" />
        <span>{{ scorePercent }}%</span>
      </div>
      <h2 class="font-bold">{{ guess.joker.name }}</h2>
      <div class="ml-auto">
        <i-charm-chevron-up v-if="expanded" />
        <i-charm-chevron-down v-else />
      </div>
    </div>
    <div class="flex w-full flex-auto items-center gap-x-1 p-1 sm:p-2" v-if="expanded">
      <button class="group relative">
        <JokerCard size="sm" :joker="guess.joker" class="ml-1 max-w-12 sm:mx-4 sm:max-w-16" />
        <div
          class="absolute bottom-full left-0 z-10 mb-2 hidden w-max max-w-2xs space-y-2 rounded-lg border border-slate-700 bg-slate-950/95 p-2 text-center whitespace-pre-line text-slate-300 shadow-xl shadow-slate-700/50 backdrop-blur-lg group-hover:block group-focus:block"
        >
          <p>{{ guess.joker.effect }}</p>
          <div class="flex justify-center">
            <Rarity :rarity="guess.info.rarity.value" class="text-xs" />
          </div>
        </div>
      </button>
      <GuessInfo :guess="guess" />
    </div>
  </div>
</template>
