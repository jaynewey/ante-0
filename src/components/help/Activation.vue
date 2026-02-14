<template>
  <div class="space-y-2">
    <h3 class="font-semibold">Activation</h3>
    <p class="pb-2 text-sm">
      Jokers can have abilities activated in 0 or more of the following ways:
    </p>
    <ul class="list-outside list-disc space-y-2 pb-4 pl-8 text-sm/6">
      <li>
        <span class="font-bold">On Played</span>: activates immediately when you play cards, and
        before scoring.
      </li>
      <li>
        <span class="font-bold">On Scored</span>: activates on every scored card from your played
        hand.
      </li>
      <li><span class="font-bold">On Held</span>: activates on certain cards held in hand.</li>
      <li>
        <span class="font-bold">Independent</span>: activates after all the cards in hand are
        scored.
      </li>
      <li>
        <span class="font-bold">On Other Jokers</span>: activates on certain other Jokers. This does
        not apply to jokers which copy the effect of other jokers because those are treated as an
        individual joker.
      </li>
      <li>
        <span class="font-bold">On Discard</span>: activates on discarding certain cards or poker
        hands.
      </li>
      <li><span class="font-bold">On Blind Select</span>: activates when a blind is selected.</li>
    </ul>
    <p class="text-sm">
      If a joker is passively active, such as Four Fingers, it will not have any activations.
    </p>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <ul class="space-y-4 text-sm">
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="complete" /> Complete match
        </p>
        <p class="text-xs">
          All activations of the guess joker are of the mystery joker and vice-versa OR the guess
          joker and mystery joker both have no activations.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center">
          <Correctness class="mr-1" match="partial" /> Partial match
        </p>
        <p class="text-xs">
          Not all activations of the guess joker are of the mystery joker OR not all activations of
          the mystery joker are of the guess joker.
        </p>
      </li>
      <li class="space-y-2">
        <p class="flex flex-row items-center"><Correctness class="mr-1" match="none" /> No match</p>
        <p class="text-xs">
          No activations of the guess joker are activations of the mystery joker.
        </p>
      </li>
    </ul>
  </div>
</template>
