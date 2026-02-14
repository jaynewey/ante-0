import { computed, reactive, watch, type ComputedRef, type Reactive } from 'vue'
import { getJokerByName, getMysteryJoker, searchJokers, type Joker, type Rarity } from './jokers.ts'
import { calculateScore, getScoreColour, computeGuessInfo, type Guess } from './score.ts'
import type { BackgroundColours } from './types.ts'
import { BACKGROUND_AMBER, BACKGROUND_GREEN, BACKGROUND_RED } from './constants.ts'
import { SortBy } from './enums.ts'
import { fetchGuesses, fetchExpandedJoker, fetchPreviousWins } from './localStorage.ts'

export type Wins = {
  [key: string]: {
    date: string
    numGuesses: number
  }
}

type Store = {
  flashColour: BackgroundColours | null
  search: string
  mysteryJoker: Joker
  guesses: Guess[]
  expandedJoker: string | null
  sortBy: SortBy
  filteredJokers: ComputedRef
  currentGuess: ComputedRef
  gameWon: ComputedRef
  previousWins: Wins
  guessJoker: () => void
}

const mysteryJoker = getMysteryJoker()

export const store: Reactive<Store> = reactive({
  flashColour: null,
  search: '',
  mysteryJoker: mysteryJoker,
  guesses: fetchGuesses(mysteryJoker),
  expandedJoker: fetchExpandedJoker(),
  sortBy: SortBy.Rarity,
  filteredJokers: computed(() => {
    const filteredJokers = searchJokers(store.search).filter(
      (joker) => !store.guesses.map((guess) => guess.joker.name).includes(joker.name),
    )

    // I know this is essentially a sort on every keypress, but there is only max 150 items
    // (don't kill me pls)
    switch (store.sortBy) {
      case SortBy.Alphabetical:
        return filteredJokers.sort((joker1, joker2) => joker1.name.localeCompare(joker2.name))
      case SortBy.Rarity:
      default:
        return filteredJokers.sort(
          (joker1, joker2) => getRarityRank(joker2.rarity) - getRarityRank(joker1.rarity),
        )
    }
  }),
  currentGuess: computed(() =>
    store.filteredJokers.length === 1 ? store.filteredJokers[0] : getJokerByName(store.search),
  ),
  gameWon: computed(() =>
    store.guesses.map((guess) => guess.joker.name).includes(store.mysteryJoker.name),
  ),
  previousWins: fetchPreviousWins(),
  guessJoker() {
    if (store.currentGuess === undefined) {
      return
    }
    const info = computeGuessInfo(store.currentGuess, store.mysteryJoker)
    const score = calculateScore(info)
    const scoreColour = getScoreColour(score)
    switch (scoreColour) {
      case 'red':
        store.flashColour = BACKGROUND_RED
        break
      case 'amber':
        store.flashColour = BACKGROUND_AMBER
        break
      case 'green':
        store.flashColour = BACKGROUND_GREEN
        break
    }

    const joker = store.currentGuess
    store.guesses.push({
      score: score,
      info: info,
      joker: joker,
    })
    store.expandedJoker = joker.name
    store.search = ''
  },
})

function getRarityRank(rarity: Rarity) {
  switch (rarity) {
    case 'Common':
      return 4
    case 'Uncommon':
      return 3
    case 'Rare':
      return 2
    case 'Legendary':
      return 1
  }
}

// persist guesses to local storage
// we don't need all the extra fluff, we can just persist the joker names
// and re-calculate everything on load
watch(store.guesses, (guesses) => {
  localStorage.setItem('guesses', JSON.stringify(guesses.map((guess) => guess.joker.name)))

  const gameWon = guesses.map((guess) => guess.joker.name).includes(store.mysteryJoker.name)
  if (!gameWon) return

  const previousNumGuesses = store.previousWins[store.mysteryJoker.name]?.numGuesses
  if (previousNumGuesses && previousNumGuesses <= guesses.length) {
    return
  }

  const previousWins = {
    ...store.previousWins,
    [store.mysteryJoker.name]: {
      numGuesses: guesses.length,
      date: new Date().toISOString().slice(0, 10),
    },
  }
  store.previousWins = previousWins
  localStorage.setItem('previousWins', JSON.stringify(previousWins))
})

watch(
  () => store.expandedJoker,
  (expandedJoker) => {
    localStorage.setItem('expandedJoker', expandedJoker ?? '')
  },
)
