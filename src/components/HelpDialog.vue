<script setup lang="ts">
import { ref } from 'vue'
import Dialog from './Dialog.vue'
import Scrollable from './Scrollable.vue'
import Abilities from './help/Abilities.vue'
import Activation from './help/Activation.vue'
import Rarity from './help/RarityHelp.vue'
import Compatibility from './help/Compatibility.vue'
import Cards from './help/Cards.vue'
import Hands from './help/Hands.vue'
import GeneralInfo from './help/GeneralInfo.vue'

const TABS = [
  'General Info',
  'Abilities',
  'Activation',
  'Rarity',
  'Compatibility',
  'Cards',
  'Hands',
] as const
type HelpTab = (typeof TABS)[number]

const show = defineModel('show', { type: Boolean })
const selectedTab = ref<HelpTab>(TABS[0])
</script>

<template>
  <Dialog v-model:show="show" class="flex items-center justify-center">
    <div
      class="flex max-h-[75dvh] max-w-[75vw] min-w-2xs flex-col space-y-4 pb-4 sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <div class="flex flex-row items-center gap-x-2 px-2">
        <i-charm-help />
        <h2 class="text-lg font-semibold">Help</h2>
      </div>
      <Scrollable x class="flex flex-none flex-row gap-x-2 px-4 pt-1 pb-4 text-sm text-nowrap">
        <button
          v-for="tab in TABS"
          :key="tab"
          @click="selectedTab = tab"
          class="cursor-pointer rounded-full border px-2 py-1 transition-all duration-200 hover:scale-105 active:scale-95"
          :class="[
            tab === selectedTab
              ? 'border-slate-200 bg-slate-700/10 text-slate-200'
              : 'border-slate-500 bg-slate-700/10 text-slate-500',
          ]"
        >
          {{ tab }}
        </button>
      </Scrollable>
      <Scrollable y class="flex px-4 pb-4">
        <GeneralInfo v-if="selectedTab === 'General Info'" />
        <Abilities v-if="selectedTab === 'Abilities'" />
        <Activation v-else-if="selectedTab === 'Activation'" />
        <Rarity v-else-if="selectedTab === 'Rarity'" />
        <Compatibility v-else-if="selectedTab === 'Compatibility'" />
        <Cards v-else-if="selectedTab === 'Cards'" />
        <Hands v-else-if="selectedTab === 'Hands'" />
      </Scrollable>
    </div>
  </Dialog>
</template>
