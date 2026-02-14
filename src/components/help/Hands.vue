<template>
  <div class="space-y-2">
    <h3 class="font-semibold">Hands</h3>
    <p class="pb-2 text-sm">Jokers can be affected by the following in-game hands:</p>
    <ul class="list-outside list-disc space-y-2 pb-4 pl-8 text-sm">
      <li>Pair</li>
      <li>Two Pair</li>
      <li>Three of a Kind</li>
      <li>Straight</li>
      <li>Flush</li>
      <li>Full House</li>
      <li>Four of a Kind</li>
      <li>Straight Flush</li>
      <li>Five of a Kind</li>
      <li>Flush House</li>
      <li>Flush Five</li>
    </ul>
    <p class="text-sm">High Card and Royal Flush do not count as hands which affect any jokers.</p>
    <p class="text-sm">
      Jokers which only require the played hand to contain a type of hand will also have compatible
      hands in their hand list. For example, Spare Trousers will have Full House in its hand list.
    </p>
    <p class="text-sm">
      Jokers which require a specific hand size but don't mention a specific hand do not contain
      hands in their hand list.
    </p>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <ul class="space-y-4 text-sm">
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="complete" /> Complete match
        </p>
        <p class="text-xs">
          All hands which affect the guess joker affect the mystery joker and vice-versa.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="partial" /> Partial match
        </p>
        <p class="text-xs">
          Not all hands which affect the guess joker affect the mystery joker OR not all hands which
          affect the mystery joker affect the guess joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center"><Correctness class="mr-1" match="none" /> No match</p>
        <p class="text-xs">
          No hands which affect the guess joker are hands which affect the mystery joker.
        </p>
      </li>
    </ul>
  </div>
</template>
