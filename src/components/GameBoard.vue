<script setup lang="ts">
import Welcome from './Welcome.vue'
import Guess from './Guess.vue'
import { store } from '../store'
</script>

<template>
  <div class="flex flex-auto overflow-auto py-4">
    <div class="m-auto flex max-w-2xl flex-auto">
      <div
        class="mx-4 flex w-full flex-col rounded-lg border border-slate-950 bg-slate-950/25 p-4 backdrop-blur-sm md:m-0"
      >
        <ul v-if="store.guesses.length > 0" class="flex w-full flex-auto flex-col gap-y-4">
          <p class="text-sm">Your guesses</p>
          <li
            v-for="guess in [...store.guesses].sort((g1, g2) => g2.score - g1.score)"
            :key="guess.joker.name"
          >
            <Guess :guess="guess" />
          </li>
        </ul>
        <Welcome v-else />
      </div>
    </div>
  </div>
</template>
