<script setup lang="ts">
import { computed, onMounted, reactive, useTemplateRef } from 'vue'

interface Props {
  x?: boolean
  y?: boolean
}
const props = defineProps<Props>()

const overflows = computed(() => {
  return {
    'overflow-x-auto': props.x,
    'overflow-y-auto': props.y,
  }
})

const masks = reactive({
  'mask-l-from-90%': false,
  'mask-r-from-90%': false,
  'mask-t-from-90%': false,
  'mask-b-from-90%': false,
})

const scrollElem = useTemplateRef('scrollElem')

const applyMasks = () => {
  if (!scrollElem.value) return
  const { scrollLeft, scrollTop, scrollHeight, scrollWidth, clientHeight, clientWidth } =
    scrollElem.value

  masks['mask-l-from-90%'] = props.x && Math.round(scrollLeft) > 0
  masks['mask-r-from-90%'] = props.x && Math.round(scrollLeft + clientWidth) < scrollWidth
  masks['mask-t-from-90%'] = props.y && Math.round(scrollTop) > 0
  masks['mask-b-from-90%'] = props.y && Math.round(scrollTop + clientHeight) < scrollHeight
}

onMounted(applyMasks)
</script>

<template>
  <div :class="{ ...masks, ...overflows }" @scroll="applyMasks" ref="scrollElem">
    <slot></slot>
  </div>
</template>
