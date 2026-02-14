<script setup lang="ts">
import type { Guess } from '@/score'
import GuessInfoAttribute from './GuessInfoAttribute.vue'
import Ability from './Ability.vue'
import Suit from './Suit.vue'
import Perishable from './Perishable.vue'
import Eternal from './Eternal.vue'

interface Props {
  guess: Guess
}

defineProps<Props>()
</script>

<template>
  <div class="grid grow grid-cols-2 gap-y-1 sm:gap-x-1">
    <GuessInfoAttribute name="Abilities" :match="guess.info.abilities.overlap">
      <ul class="flex flex-wrap gap-2 text-xs">
        <li v-for="ability in guess.info.abilities.value" :key="ability">
          <Ability :ability="ability" />
        </li>
      </ul>
    </GuessInfoAttribute>
    <GuessInfoAttribute name="Activation" :match="guess.info.activation.overlap">
      <ul class="space-y-2" v-if="guess.info.activation.value.length">
        <li v-for="activation in guess.info.activation.value" :key="activation">
          {{ activation }}
        </li>
      </ul>
      <span v-else>Not applicable</span>
    </GuessInfoAttribute>
    <GuessInfoAttribute name="Rarity" :match="guess.info.rarity.match ? 'complete' : 'none'">
      <Rarity :rarity="guess.info.rarity.value" class="text-xs" />
    </GuessInfoAttribute>
    <GuessInfoAttribute name="Compatibility" :match="guess.info.compatibility.overlap">
      <ul class="flex flex-col items-center space-y-2">
        <li v-if="guess.info.compatibility.value.copyable">
          {{ guess.joker.compatibility.copyable ? 'Can be copied' : "Can't be copied" }}
        </li>
        <li v-if="guess.info.compatibility.value.perishable" class="flex flex-row text-nowrap">
          <span>{{ guess.joker.compatibility.perishable ? 'Can be' : "Can't be" }}</span>
          <Perishable />
        </li>
        <li v-if="guess.info.compatibility.value.eternal" class="flex flex-row text-nowrap">
          <span>{{ guess.joker.compatibility.eternal ? 'Can be' : "Can't be" }}</span>
          <Eternal />
        </li>
      </ul>
    </GuessInfoAttribute>
    <GuessInfoAttribute name="Cards" :match="guess.info.cards.overlap">
      <ul class="flex flex-col items-center space-y-2 text-nowrap">
        <li v-if="guess.info.cards.value.ranks.overlap !== 'none'">
          {{
            guess.info.cards.value.ranks.value.length > 0
              ? guess.info.cards.value.ranks.value.join(', ')
              : 'No specified ranks'
          }}
        </li>
        <li v-if="guess.info.cards.value.suits.overlap !== 'none'">
          <ul v-if="guess.info.cards.value.suits.value.length" class="flex flex-wrap gap-2 text-xs">
            <li v-for="suit in guess.info.cards.value.suits.value" :key="suit">
              <Suit :suit="suit" />
            </li>
          </ul>
          <span v-else>No specified suits</span>
        </li>
        <li v-if="guess.info.cards.value.enhancements.overlap !== 'none'" class="text-wrap">
          {{
            guess.info.cards.value.enhancements.value.length > 0
              ? guess.info.cards.value.enhancements.value.join(', ')
              : 'No specified enhancements'
          }}
        </li>
        <li v-if="guess.info.cards.value.consumables.overlap !== 'none'" class="text-wrap">
          {{
            guess.info.cards.value.consumables.value.length > 0
              ? guess.info.cards.value.consumables.value.join(', ')
              : 'No specified consumables'
          }}
        </li>
      </ul>
    </GuessInfoAttribute>
    <GuessInfoAttribute name="Hands" :match="guess.info.hands.overlap">
      {{
        guess.info.hands.value.length > 0 ? guess.info.hands.value.join(', ') : 'No specified hands'
      }}
    </GuessInfoAttribute>
  </div>
</template>
