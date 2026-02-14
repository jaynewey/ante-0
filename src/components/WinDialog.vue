<script setup lang="ts">
import { getGuessesText } from '@/score'
import Dialog from './Dialog.vue'
import { store } from '@/store'
import { computed } from 'vue'
import { SHARE_URL } from '@/constants'
import JokerCard from './JokerCard.vue'
import TimeLeft from './TimeLeft.vue'

const show = defineModel('show', { type: Boolean })

const guessesText = computed(() => getGuessesText(store.guesses))
const shareText = computed(() => `Here's how I did: ${guessesText.value}`)
</script>

<template>
  <Dialog v-model:show="show" class="flex items-center justify-center">
    <div class="max-w-sm min-w-2xs space-y-4 p-4 text-center">
      <div class="group relative mx-auto w-fit" tabindex="0">
        <JokerCard :joker="store.mysteryJoker" size="lg" class="mx-auto my-4" />
        <div
          class="absolute top-0 left-full z-10 mt-2 mb-1 ml-2 hidden rounded-lg border border-slate-700 bg-slate-950/95 p-2 text-center text-xs text-slate-300 shadow-xl shadow-slate-700/50 backdrop-blur-lg group-hover:flex group-focus:flex"
        >
          <Sticker sticker="gold" />
        </div>
      </div>
      <h2 class="text-lg font-bold">You win!</h2>
      <p class="text-sm">
        You found
        <span class="font-bold"> {{ store.mysteryJoker.name }} </span>
        in
        <span class="font-bold"> {{ store.guesses.length }} </span>
        guess{{ store.guesses.length > 1 ? 'es' : '' }}!
      </p>
      <p class="text-xs">New mystery joker in:</p>
      <p class="text-sm"><TimeLeft class="font-bold" /></p>
      <div class="rounded-lg bg-slate-950 p-2">
        <span class="tracking-wider wrap-anywhere">{{ guessesText }}</span>
      </div>
      <div class="flex justify-center">
        <Share title="Play Ante 0!" :text="shareText" :url="SHARE_URL" />
      </div>
    </div>
  </Dialog>
</template>
