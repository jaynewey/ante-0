<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'

const transforms = reactive({
  tiltX: 0,
  tiltY: 0,
  shadowX: 5,
  shadowY: 5,
})

const maxTilt: number = 20 // max tilt angle
const maxShadow: number = 10

const card = useTemplateRef('card')

function onMouseMove(event: MouseEvent): void {
  if (!card.value) {
    return
  }
  const { clientX, clientY } = event
  // get card's bounding rectangle relative to the viewport
  const { left, top, width, height } = card.value.getBoundingClientRect()

  // calculate center of card
  const centerX = left + width / 2
  const centerY = top + height / 2

  // calculate distance from mouse position to the center of the card
  const deltaX = (clientX - centerX) / (width / 2)
  const deltaY = (clientY - centerY) / (height / 2)

  // calculate tilt angles based on the mouse position relative to the center
  transforms.tiltX = deltaY * maxTilt
  transforms.tiltY = -deltaX * maxTilt

  // translate the shadows
  transforms.shadowX = -deltaX * maxShadow
  transforms.shadowY = -deltaY * maxShadow
}

// reset tilt when mouse leaves
function onMouseLeave(): void {
  transforms.tiltX = 0
  transforms.tiltY = 0
  transforms.shadowX = 5
  transforms.shadowY = 5
}
</script>

<template>
  <div
    class="relative inline-block origin-center transition-transform ease-out hover:scale-[1.1] active:scale-[1.1]"
    :style="{ transform: `rotateX(${transforms.tiltX}deg) rotateY(${transforms.tiltY}deg)` }"
    ref="card"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div
      class="animate-dance relative block transition-transform ease-out transform-3d"
      :style="{
        filter: `drop-shadow(${transforms.shadowX}px ${transforms.shadowY}px 0px rgba(0, 0, 0, 0.75))`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
