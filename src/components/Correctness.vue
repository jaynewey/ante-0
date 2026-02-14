<script setup lang="ts">
import type { OverlapType } from '@/score'

interface Props {
  match: OverlapType
}

defineProps<Props>()
</script>

<template>
  <i-charm-circle-tick v-if="match === 'complete'" class="text-emerald-300" />
  <i-charm-info v-else-if="match === 'partial'" class="text-amber-300" />
  <i-charm-circle-cross v-else class="text-red-300" />
</template>
