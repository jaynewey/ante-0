import { calculateScore, computeGuessInfo, type Guess } from './score.ts'
import { type Wins } from './store.ts'
import { getJokerByName, type Joker } from './jokers.ts'

export function fetchGuesses(mysteryJoker: Joker): Guess[] {
  const today = new Date()
  const todayIso = today.toISOString().slice(0, 10)
  const lastDateIso = localStorage.getItem('lastDate')

  if (!lastDateIso || todayIso !== lastDateIso) {
    // ensure we wipe the guesses from local storage
    localStorage.setItem('guesses', JSON.stringify([]))
    return []
  }

  const guessesRaw = localStorage.getItem('guesses')
  if (!guessesRaw) return []

  let guessesParsed
  try {
    guessesParsed = JSON.parse(guessesRaw)
  } catch (e) {
    console.error(e)
    return []
  }

  if (!Array.isArray(guessesParsed)) return []

  // take our guess joker names and reconstruct each into an actual Guess
  // if we can't find the joker by its name, forget about it
  return guessesParsed
    .map((jokerName) => {
      const joker = getJokerByName(jokerName)
      if (!joker) return null

      const guessInfo = computeGuessInfo(joker, mysteryJoker)

      return {
        score: calculateScore(guessInfo),
        info: guessInfo,
        joker: joker,
      }
    })
    .filter((jokerName) => jokerName !== null)
}

export function fetchExpandedJoker(): string | null {
  const expandedJoker = localStorage.getItem('expandedJoker') ?? ''
  if (!getJokerByName(expandedJoker)) return null
  return expandedJoker
}

export function fetchPreviousWins(): Wins {
  const previousWinsRaw = localStorage.getItem('previousWins')
  if (!previousWinsRaw) return {}

  const previousWinsParsed = JSON.parse(previousWinsRaw)

  const previousWins: Wins = {}

  for (const jokerName in previousWinsParsed) {
    const win = previousWinsParsed[jokerName]

    if (typeof win?.numGuesses !== 'number') continue
    if (typeof win?.date !== 'string') continue

    previousWins[jokerName] = {
      numGuesses: win.numGuesses,
      date: win.date,
    }
  }

  return previousWins
}
