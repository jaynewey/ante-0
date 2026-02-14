<script setup lang="ts">
import { typedJokers, type Joker } from '@/jokers'
import { store } from '@/store'
import CollectionJoker from './CollectionJoker.vue'
import UndiscoveredJokerCard from './UndiscoveredJokerCard.vue'

const show = defineModel('show', { type: Boolean })

const jokersPerPage = 15

const pages: Joker[][] = []

for (let i = 0; i < typedJokers.length; i += jokersPerPage) {
  pages.push(typedJokers.slice(i, i + jokersPerPage))
}
</script>

<template>
  <Dialog v-model:show="show" class="flex items-center justify-center">
    <div class="max-w-[75vw] max-w-sm min-w-2xs space-y-2 p-4">
      <div class="flex flex-row items-center gap-x-2">
        <i-charm-book />
        <h2 class="text-lg font-semibold">Collection</h2>
      </div>
      <p class="pt-4 text-sm">
        <template v-if="Object.keys(store.previousWins).length === Object.keys(typedJokers).length"
          >Well done! You have discovered every joker!</template
        >
        <template v-else>Keep playing to discover more jokers!</template>
      </p>
      <Scrollable x class="flex flex-row gap-x-1 px-2 py-6">
        <div
          class="grid min-w-full grid-cols-5 place-items-start gap-x-1"
          v-for="(page, index) in pages"
          :key="index"
        >
          <div v-for="(joker, index) in page" :key="joker.name">
            <CollectionJoker
              v-if="joker.name in store.previousWins"
              :joker="joker"
              :tooltip-position="index >= 10 ? 'top' : 'bottom'"
            />
            <UndiscoveredJokerCard size="sm" class="hover:z-10" v-else />
          </div>
        </div>
      </Scrollable>
    </div>
  </Dialog>
</template>
