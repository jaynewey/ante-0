<script setup lang="ts">
import Eternal from '../Eternal.vue'
import Perishable from '../Perishable.vue'
</script>

<template>
  <div class="space-y-2">
    <h3 class="font-semibold">Compatibility</h3>
    <p class="pb-2 text-sm">Jokers have 3 types of compatibility:</p>
    <ul class="list-outside list-disc space-y-2 pl-8 text-sm">
      <li>
        Whether or not the joker can be <span class="font-bold">copied</span> by jokers like
        Blueprint or Brainstorm.
      </li>
      <li>
        Whether or not the joker can receive the<Perishable class="inline" /> sticker. Most positive
        scaling jokers which do not reset cannot receive this sticker.
      </li>
      <li>
        Whether or not the joker can receive the<Eternal class="inline" /> sticker. Most jokers
        which self destruct or activate on sell cannot receive this sticker.
      </li>
    </ul>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <ul class="space-y-4 text-sm">
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="complete" /> Complete match
        </p>
        <p class="text-xs">
          All compatibility flags of the guess joker are the same as the mystery joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="partial" /> Partial match
        </p>
        <p class="text-xs">
          Not all compabatibility flags of the guess joker are the same as mystery joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center"><Correctness class="mr-1" match="none" /> No match</p>
        <p class="text-xs">
          No compabatibility flags of the guess joker are the same as mystery joker.
        </p>
      </li>
    </ul>
  </div>
</template>
