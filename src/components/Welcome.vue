<script setup lang="ts">
import { store } from '../store'
import UndiscoveredJokerCard from './UndiscoveredJokerCard.vue'
</script>

<template>
  <div
    class="m-4 flex flex-auto flex-col items-center gap-y-4 rounded-lg border border-slate-600 p-4 text-center sm:m-8 sm:p-8"
  >
    <div class="mx-auto my-8">
      <JokerCard v-if="store.currentGuess" size="lg" :joker="store.currentGuess" />
      <UndiscoveredJokerCard size="lg" v-else />
    </div>
    <h2 class="text-xl font-bold">Guess the mystery joker</h2>
    <p>Type your first guess using the search below.</p>
    <i-charm-chevron-down class="mt-4 animate-bounce text-slate-600" />
  </div>
</template>
