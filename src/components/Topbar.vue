<script setup lang="ts">
import { ref } from 'vue'
import HelpDialog from './HelpDialog.vue'
import Collection from './Collection.vue'

const showHelpDialog = ref(false)
const showCollection = ref(false)
</script>

<template>
  <HelpDialog v-model:show="showHelpDialog" />
  <Collection v-model:show="showCollection" />
  <div
    class="fixed right-0 z-10 mx-auto flex max-w-2xl flex-row items-center gap-x-2 rounded-bl-lg border-b border-l border-slate-950 bg-slate-950/50 p-2 backdrop-blur-sm"
  >
    <div class="px-2">
      <h1 class="text-lg font-bold">Ante 0</h1>
    </div>
    <button
      class="cursor-pointer rounded-lg border border-slate-950 bg-slate-700 p-3 transition-all duration-100 hover:scale-105 hover:bg-slate-600 active:scale-95 active:bg-slate-500 disabled:scale-100"
      @click="showCollection = true"
    >
      <i-charm-book />
    </button>
    <button
      class="cursor-pointer rounded-lg border border-slate-950 bg-slate-700 p-3 transition-all duration-100 hover:scale-105 hover:bg-slate-600 active:scale-95 active:bg-slate-500 disabled:scale-100"
      @click="showHelpDialog = true"
    >
      <i-charm-help />
    </button>
  </div>
</template>
