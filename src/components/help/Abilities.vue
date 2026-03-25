<script setup lang="ts">
import Ability from '../Ability.vue'
</script>

<template>
  <div class="space-y-2">
    <h3 class="font-semibold">Abilities</h3>
    <p class="pb-2 text-sm">Jokers may have 1 or more of the following abilities:</p>
    <ul class="list-outside list-disc space-y-2 pl-8 text-sm/6">
      <li>
        <Ability class="mr-1 inline text-xs" ability="+ Chips" /> jokers add to the chips total.
      </li>
      <li>
        <Ability class="mr-1 inline text-xs" ability="+ Mult" /> jokers add to the mult total.
      </li>
      <li>
        <Ability class="mr-1 inline text-xs" ability="X Mult" /> jokers multiply the mult total.
      </li>
      <li>
        <Ability class="mr-1 inline text-xs" ability="Effect" /> jokers have some effect other than
        scoring, such as creating consumables or disabling the boss blind.
      </li>
      <li><Ability class="mr-1 inline text-xs" ability="Economy" /> jokers add $.</li>
      <li>
        <Ability class="mr-1 inline text-xs" ability="Self Destruct" />
        jokers can self destruct. This includes food items like Ice Cream. This does not apply to
        jokers which destroy other jokers.
      </li>
      <li>
        <Ability class="mr-1 inline text-xs" ability="Retrigger" /> jokers cause retriggers of
        played cards or jokers. This does not apply to jokers which copy the effect of other jokers.
      </li>
      <li>
        <Ability class="mr-1 inline text-xs" ability="Scale" /> jokers can scale themselves up or
        down. This does not apply to jokers which scale other cards, like Hiker.
      </li>
    </ul>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <ul class="space-y-4 text-sm">
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="complete" /> Complete match
        </p>
        <p class="text-xs">
          All abilities of the guess joker are of the mystery joker and vice-versa.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="partial" /> Partial match
        </p>
        <p class="text-xs">
          Not all abilities of the guess joker are of the mystery joker OR not all abilities of the
          mystery joker are of the guess joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center"><Correctness class="mr-1" match="none" /> No match</p>
        <p class="text-xs">No abilities of the guess joker are abilities of the mystery joker.</p>
      </li>
    </ul>
  </div>
</template>
