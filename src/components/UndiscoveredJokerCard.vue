<script setup lang="ts">
interface Props {
  size: 'sm' | 'lg'
}

defineProps<Props>()
</script>

<template>
  <Card class="relative">
    <img
      src="/src/assets/jokers/Undiscovered Joker.png"
      class="animate-breathe absolute"
      :class="{ 'w-16': size === 'sm', 'w-24': size === 'lg' }"
    />
    <img
      src="/src/assets/jokers/Undiscovered Base.png"
      :class="{ 'w-16': size === 'sm', 'w-24': size === 'lg' }"
    />
  </Card>
</template>
