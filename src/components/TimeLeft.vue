<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const timeLeft = ref('0 hrs 0 mins 0 secs')
let timerInterval: number

const calculateTimeLeft = () => {
  const now = new Date()
  const nextDay = new Date()
  nextDay.setHours(24, 0, 0, 0) // next day's midnight

  const remainingTime = nextDay.valueOf() - now.valueOf()

  const hours = Math.floor(remainingTime / (1000 * 60 * 60))
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

  const hoursPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''
  const minutesPart = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : ''
  timeLeft.value = `${hoursPart} ${minutesPart} ${seconds} sec${seconds !== 1 ? 's' : ''}`
}

onMounted(() => {
  calculateTimeLeft()

  // update countdown every second
  timerInterval = setInterval(calculateTimeLeft, 1000)
})

onBeforeUnmount(() => {
  // clear interval when component is destroyed
  clearInterval(timerInterval)
})
</script>

<template>
  <span>{{ timeLeft }}</span>
</template>
