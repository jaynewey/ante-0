<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { store } from '../store'
import { SortBy } from '@/enums'
import { getJokerByName, type Joker, type Rarity as RarityType } from '@/jokers'
import Rarity from './Rarity.vue'
import RarityButton from './RarityButton.vue'
import WinDialog from './WinDialog.vue'

const isFocussed = ref(false)
const dropdown = useTemplateRef('dropdown')
const input = useTemplateRef('input')

const showWinDialog = ref(false)
// show the win dialog when the game is won and ensure we stop showing the dropdown
watch(
  () => store.gameWon,
  () => {
    showWinDialog.value = true
    isFocussed.value = false
  },
)

const rarities = ref<Set<RarityType>>(new Set(['Common', 'Uncommon', 'Rare', 'Legendary']))
const filteredJokers = computed(() =>
  store.filteredJokers.filter((joker: Joker) => rarities.value.has(joker.rarity)),
)

function onBlur(event: FocusEvent) {
  if (!event?.relatedTarget) {
    isFocussed.value = false
    return
  }
  const clickedDropdown = dropdown.value?.contains(event?.relatedTarget as Node)
  const clickedInput = input.value?.contains(event?.relatedTarget as Node)
  if (!clickedDropdown && !clickedInput) isFocussed.value = false
}
</script>

<template>
  <WinDialog v-model:show="showWinDialog" />
  <Transition
    enter-active-class="duration-100 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      class="relative mx-4 flex max-w-screen justify-center md:mx-0"
      v-if="isFocussed && filteredJokers.length > 0"
      ref="dropdown"
      tabindex="-1"
      @blur="onBlur"
    >
      <div
        class="opacity-full absolute bottom-0 mb-4 flex w-full flex-col gap-y-2 duration-300 md:max-w-xl"
      >
        <div
          class="mx-auto flex flex-row gap-x-2 overflow-x-auto rounded-lg border border-slate-700 bg-slate-950/50 p-2 text-sm shadow-xl shadow-slate-700 backdrop-blur-lg"
        >
          <button
            class="cursor-pointer rounded-full border border-slate-200 bg-slate-700/10 p-1 text-slate-200 transition-all duration-200 hover:scale-105 active:scale-95"
            @click="
              store.sortBy =
                store.sortBy === SortBy.Alphabetical ? SortBy.Rarity : SortBy.Alphabetical
            "
            @blur="onBlur"
            :title="store.sortBy === SortBy.Alphabetical ? 'Sort by rarity' : 'Sort alphabetically'"
          >
            <i-lucide-arrow-down-narrow-wide v-if="store.sortBy === SortBy.Rarity" />
            <i-lucide-arrow-down-a-z v-else />
          </button>
          <div class="flex flex-row gap-x-2 border-l border-slate-700 pl-2">
            <RarityButton rarity="Common" :rarities="rarities" @blur="onBlur" />
            <RarityButton rarity="Uncommon" :rarities="rarities" @blur="onBlur" />
            <RarityButton rarity="Rare" :rarities="rarities" @blur="onBlur" />
            <RarityButton rarity="Legendary" :rarities="rarities" @blur="onBlur" />
          </div>
        </div>
        <ul
          class="max-h-96 w-full overflow-auto rounded-lg border border-slate-700 bg-slate-950/50 shadow-xl shadow-slate-700 backdrop-blur-lg"
        >
          <!-- choosing to use mousedown here because trackpad taps are annoying. maybe there's a
            better way.... -->
          <li
            v-for="joker in filteredJokers"
            :key="joker.name"
            class="flex cursor-pointer flex-row items-center gap-x-4 p-4 transition-all duration-200 hover:bg-slate-950/50"
            @mousedown="
              () => {
                store.search = joker.name
                isFocussed = false
              }
            "
          >
            <JokerCard size="sm" :joker="joker" />
            <div>
              <p class="mb-2 text-lg">{{ joker.name }}</p>
              <Rarity class="text-xs" :rarity="joker.rarity" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
  <div
    class="mb-0 flex w-screen justify-center border-t border-slate-950 bg-slate-950/50 p-4 backdrop-blur-sm"
  >
    <button
      @click="showWinDialog = true"
      class="flex max-w-3xs grow cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-slate-950 bg-slate-700 p-2 text-center font-semibold hover:scale-105 hover:bg-slate-600 active:scale-95 active:bg-slate-500"
      v-if="store.gameWon"
    >
      <i-charm-eye />
      <span>Show results</span>
    </button>
    <fieldset v-else>
      <form
        @submit.prevent="store.guessJoker()"
        class="flex w-screen max-w-2xl flex-row gap-x-2 px-4"
      >
        <div
          class="flex grow gap-x-2 rounded-lg border border-slate-700 bg-slate-950 p-2 outline-slate-600 has-[input:focus-within]:outline"
        >
          <i-charm-search
            class="my-auto text-slate-600"
            :class="{ 'text-slate-700': !isFocussed }"
          />
          <input
            class="w-0 grow"
            type="text"
            placeholder="Search for a joker"
            ref="input"
            :value="store.search"
            @input="
              (event) => (store.search = (event.currentTarget as HTMLInputElement).value ?? '')
            "
            @focus="isFocussed = true"
            @blur="onBlur"
            @keyup.enter="(event) => (event.currentTarget as HTMLInputElement).blur()"
          />
        </div>
        <button
          class="flex cursor-pointer flex-row items-center gap-x-2 rounded-lg border border-slate-950 bg-slate-700 px-4 py-2 font-semibold transition-all duration-100 hover:scale-105 hover:bg-slate-600 active:scale-95 active:bg-slate-500 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-700"
          :disabled="
            store.filteredJokers.length !== 1 && getJokerByName(store.search) === undefined
          "
          type="submit"
        >
          <span>Guess</span>
          <i-charm-crosshair />
        </button>
      </form>
    </fieldset>
  </div>
</template>
