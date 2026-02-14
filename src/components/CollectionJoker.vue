<script setup lang="ts">
import type { Joker } from '@/jokers'
import { store } from '@/store'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import JokerCard from './JokerCard.vue'
import Sticker from './Sticker.vue'
import { getSticker } from '@/score'

interface Props {
  joker: Joker
  tooltipPosition: 'top' | 'bottom'
}

const props = defineProps<Props>()

const hover = ref(false)
const focus = ref(false)

const jokerElem = useTemplateRef('jokerElem')
const hoverElem = useTemplateRef('hoverElem')

const hoverPosition = reactive({
  left: 0,
  top: 0,
})

const formattedDate = computed(() => {
  const datePart = store.previousWins[props.joker.name]?.date
  if (!datePart) return ''
  const parsedDate = new Date(`${datePart}T00:00:00.000Z`)
  return parsedDate.toLocaleDateString()
})

function onHover() {
  hover.value = true
  if (!jokerElem.value || !hoverElem.value) {
    return
  }
  const jokerRect = jokerElem.value.getBoundingClientRect()
  const hoverRect = hoverElem.value.getBoundingClientRect()

  hoverPosition.left = jokerRect.left + jokerRect.width / 2 - hoverRect.width / 2
  hoverPosition.top =
    props.tooltipPosition === 'top'
      ? jokerRect.top - hoverRect.height
      : jokerRect.top + jokerRect.height
}

const numGuesses = computed(() => store.previousWins?.[props.joker.name]?.numGuesses)
const sticker = computed(() => (numGuesses.value ? getSticker(numGuesses.value) : null))
</script>

<template>
  <div tabindex="0" @mouseenter="onHover" @mouseleave="hover = false" ref="jokerElem">
    <JokerCard :joker="joker" size="sm" class="hover:z-10" />
    <Teleport to="body">
      <div
        class="invisible absolute z-20 w-max max-w-2xs space-y-2 rounded-lg border border-slate-700 bg-slate-950/95 p-2 text-center whitespace-pre-line text-slate-300 shadow-xl shadow-slate-700/50 backdrop-blur-lg focus:visible"
        :class="{ visible: hover || focus }"
        :style="{ top: `${hoverPosition.top}px`, left: `${hoverPosition.left}px` }"
        ref="hoverElem"
      >
        <p class="font-bold">{{ joker.name }}</p>
        <Sticker v-if="sticker" :sticker="sticker" class="mx-auto text-xs" />
        <p class="text-xs">
          {{ store.previousWins[joker.name]?.numGuesses }} guess{{
            (store.previousWins[joker.name]?.numGuesses ?? 0) > 1 ? 'es' : ''
          }}
        </p>
        <p class="text-xs">Found on {{ formattedDate }}</p>
      </div>
    </Teleport>
  </div>
</template>
