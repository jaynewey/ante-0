<script setup lang="ts">
import { REPO_URL } from '@/constants'
</script>

<template>
  <div class="w-full space-y-2">
    <h3 class="font-semibold">How to play</h3>
    <p class="pb-2 text-sm">Find the mystery joker in as few guesses as possible.</p>
    <ol class="list-outside list-decimal space-y-2 pl-8 text-sm/6">
      <li>
        Type a joker's name into the
        <span class="font-bold">Search <i-charm-search class="mb-1 inline" /></span> bar.
      </li>
      <li>
        Hit <span class="font-bold">Guess <i-charm-crosshair class="mb-1 inline" /></span>
      </li>
      <li>
        Use the
        <span class="font-bold">match <i-charm-circle-tick class="mb-1 inline" /></span> clues to
        get closer to the mystery joker.
      </li>
      <li>Repeat until you guess correctly!</li>
    </ol>
    <p class="pt-2 text-sm">
      Every day a new random mystery joker is set. Keep coming back to earn stickers and expand your
      <span class="font-bold"><i-charm-book class="mb-1 inline" />Collection</span>!
    </p>
    <hr class="my-8 h-px border-0 bg-slate-600" />
    <h3 class="font-semibold">Developer information</h3>
    <p class="text-xs">
      Ante 0 is open source. The source code is available on GitHub at
      <a
        class="cursor-pointer text-slate-500 underline hover:text-slate-400"
        target="_blank"
        :href="REPO_URL"
        >{{ REPO_URL }}</a
      >
      under the MIT License.
    </p>
    <p class="text-xs">
      Stars are appreciated and contributions are welcome. Feel free to open Issues or Pull Requests
      for joker adjustments or bug fixes.
    </p>
  </div>
</template>
