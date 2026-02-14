<script setup lang="ts">
import Search from './components/Search.vue'
import Background from './components/Background.vue'
import GameBoard from './components/GameBoard.vue'
import Topbar from './components/Topbar.vue'
import { onMounted } from 'vue'

onMounted(() => {
  const today = new Date()
  const todayIso = today.toISOString().slice(0, 10)
  localStorage.setItem('lastDate', todayIso)
})
</script>

<template>
  <main class="h-dvh max-w-screen bg-slate-800 text-white antialiased">
    <Background />
    <div class="flex max-h-full min-h-full flex-col">
      <Topbar />
      <GameBoard />
      <Search />
    </div>
  </main>
</template>
