<script setup lang="ts">
import Suit from '../Suit.vue'
</script>

<template>
  <div class="space-y-2">
    <h3 class="font-semibold">Cards</h3>
    <p class="pb-2 text-sm">Jokers can be affected by or create the following cards:</p>
    <ul class="list-outside list-disc space-y-2 pb-4 pl-8 text-sm">
      <li>Cards with a specified <span class="font-bold">rank</span>.</li>
      <li>Cards with a specified <span class="font-bold">suit</span>:</li>
      <ul class="list-outside list-disc space-y-2 pl-4 text-xs">
        <li><Suit suit="Club" /></li>
        <li><Suit suit="Spade" /></li>
        <li><Suit suit="Heart" /></li>
        <li><Suit suit="Diamond" /></li>
      </ul>
      <li>Cards with a specified <span class="font-bold">enhancement</span>:</li>
      <ul class="list-outside list-disc space-y-2 pl-4">
        <li>Bonus Cards</li>
        <li>Mult Cards</li>
        <li>Wild Cards</li>
        <li>Glass Cards</li>
        <li>Steel Cards</li>
        <li>Stone Cards</li>
        <li>Gold Cards</li>
        <li>Lucky Cards</li>
      </ul>
      <li><span class="font-bold">Consumable</span> cards:</li>
      <ul class="list-outside list-disc space-y-2 pl-4">
        <li>Tarot Cards</li>
        <li>Planet Cards</li>
        <li>Spectral Cards</li>
      </ul>
    </ul>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <ul class="space-y-4 text-sm">
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="complete" /> Complete match
        </p>
        <p class="text-xs">
          All cards which affect or are created by the guess joker affect or are created by the
          mystery joker and vice-versa.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="partial" /> Partial match
        </p>
        <p class="text-xs">
          Not all cards which affect or are created by the guess joker affect or are created by the
          mystery joker OR not all cards which affect or are created by the mystery joker affect or
          are created by the guess joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center"><Correctness class="mr-1" match="none" /> No match</p>
        <p class="text-xs">
          No cards which affect or are created by the guess joker are cards which affect or are
          created by the mystery joker.
        </p>
      </li>
    </ul>
  </div>
</template>
