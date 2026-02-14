<script setup lang="ts">
const show = defineModel('show', { type: Boolean })

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-100 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-bind="$attrs"
        class="size-screen fixed inset-0 z-20 bg-slate-950/50 text-white backdrop-blur-xs"
        @click.self="show = false"
        v-if="show"
      >
        <div
          class="m-4 flex flex-col rounded-lg border border-slate-600 bg-slate-800/50 p-4 shadow-xl shadow-slate-700 backdrop-blur-lg"
        >
          <button
            class="ml-auto cursor-pointer text-slate-600 transition-all duration-200 hover:scale-105 hover:text-slate-400 active:scale-95"
            @click="show = false"
          >
            <i-charm-cross />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
