<script setup lang="ts">
import Rarity from '../Rarity.vue'
</script>

<template>
  <div class="w-full space-y-2">
    <h3 class="font-semibold">Rarity</h3>
    <p class="pb-2 text-sm">Jokers can be 1 of 4 in-game rarities:</p>
    <ul class="list-outside list-disc space-y-2 pl-8 text-xs">
      <li>
        <Rarity rarity="Common" />
      </li>
      <li>
        <Rarity rarity="Uncommon" />
      </li>
      <li>
        <Rarity rarity="Rare" />
      </li>
      <li>
        <Rarity rarity="Legendary" />
      </li>
    </ul>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <ul class="space-y-4 text-sm">
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="complete" /> Match
        </p>
        <p class="text-xs">
          The rarity of the guess joker matches the rarity of the mystery joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center"><Correctness class="mr-1" match="none" /> No match</p>
        <p class="text-xs">
          The rarity of the guess joker does not match the rarity of the mystery joker.
        </p>
      </li>
    </ul>
  </div>
</template>
