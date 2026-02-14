<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  text: string
  url: string
}

const props = defineProps<Props>()
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
const isSharable = isMobile && navigator.share

const copied = ref(false)

function formatText() {
  return `${props.title}

${props.text}

${props.url}`
}

async function shareOrCopy() {
  if (isSharable) {
    await navigator.share({
      title: props.title,
      text: props.text,
      url: props.url,
    })
  } else {
    await navigator.clipboard.writeText(formatText())
    copied.value = true
    setTimeout(() => (copied.value = false), 1000)
  }
}
</script>

<template>
  <button
    @click="shareOrCopy"
    class="flex grow cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-slate-950 bg-slate-700 p-2 text-center font-semibold transition-all duration-200 hover:scale-105 hover:bg-slate-600 active:scale-95 active:bg-slate-500"
  >
    <template v-if="isSharable">
      <i-charm-share />
      <span>Share</span>
    </template>
    <template v-else>
      <template v-if="copied">
        <i-charm-clipboard-tick />
        <span>Copied!</span>
      </template>
      <template v-else>
        <i-charm-clipboard />
        <span>Copy</span>
      </template>
    </template>
  </button>
</template>
