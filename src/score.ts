import { type Joker, type Compatibility, type Suit, type Ability, type AbilityType } from './jokers'

export type OverlapType = 'complete' | 'partial' | 'none'
export type Match<T> = {
  match: boolean
  value: T
}
export type Overlap<T> = {
  overlap: OverlapType
  value: T
}
export type Cards = {
  ranks: Overlap<string[]>
  suits: Overlap<Suit[]>
  enhancements: Overlap<string[]>
  consumables: Overlap<string[]>
}
type GuessInfo = {
  name: Match<string>
  abilities: Overlap<AbilityType[]>
  activation: Overlap<string[]>
  rarity: Match<string>
  compatibility: Overlap<Compatibility>
  cards: Overlap<Cards>
  hands: Overlap<string[]>
}
export type Guess = {
  score: number
  info: GuessInfo
  joker: Joker
}

export type Sticker = 'white' | 'red' | 'green' | 'black' | 'blue' | 'purple' | 'orange' | 'gold'

function computeArrayOverlap<T>(guess: T[], target: T[]): Overlap<T[]> {
  const targetSet = new Set(target)
  const values = guess.filter((item) => targetSet.has(item))

  if (values.length === guess.length && values.length === target.length) {
    return {
      overlap: 'complete',
      value: values,
    }
  } else if (values.length) {
    return {
      overlap: 'partial',
      value: values,
    }
  }
  return {
    overlap: 'none',
    value: [],
  }
}

function combineOverlapTypes(overlapTypes: OverlapType[]): OverlapType {
  if (overlapTypes.every((overlapType) => overlapType === 'complete')) {
    return 'complete'
  } else if (overlapTypes.some((overlapType) => overlapType !== 'none')) {
    return 'partial'
  }
  return 'none'
}

function computeCompatibilityOverlap(guess: Joker, target: Joker): Overlap<Compatibility> {
  const compatibility = {
    copyable: guess.compatibility.copyable === target.compatibility.copyable,
    perishable: guess.compatibility.perishable === target.compatibility.perishable,
    eternal: guess.compatibility.eternal === target.compatibility.eternal,
  }
  const compatibilityValues = Object.values(compatibility)
  return {
    overlap: compatibilityValues.every(Boolean)
      ? 'complete'
      : compatibilityValues.some(Boolean)
        ? 'partial'
        : 'none',
    value: compatibility,
  }
}

function computeCardsOverlap(guess: Joker, target: Joker): Overlap<Cards> {
  const ranksOverlap = computeArrayOverlap(guess.ranks, target.ranks)
  const suitsOverlap = computeArrayOverlap(guess.suits, target.suits)
  const enhancementsOverlap = computeArrayOverlap(guess.enhancements, target.enhancements)
  const consumablesOverlap = computeArrayOverlap(guess.consumables, target.consumables)

  return {
    overlap: combineOverlapTypes([
      ranksOverlap.overlap,
      suitsOverlap.overlap,
      enhancementsOverlap.overlap,
      consumablesOverlap.overlap,
    ]),
    value: {
      ranks: ranksOverlap,
      suits: suitsOverlap,
      enhancements: enhancementsOverlap,
      consumables: consumablesOverlap,
    },
  }
}

function getEffects(abilities: Ability[]): AbilityType[] {
  const allEffects = abilities
    .flatMap((ability) => ability.ability)
    .map((ability) => {
      switch (ability) {
        case 'Scale Up':
        case 'Scale Up with Reset':
        case 'Scale Down':
          return 'Scale'
        case 'Chance to Self Destruct':
          return 'Self Destruct'
        case 'Requirement to Activate':
          return null
      }
      return ability
    })
    .filter((ability) => ability !== null)
  return [...new Set(allEffects)]
}

function getActivations(abilities: Ability[]): string[] {
  return abilities.map((ability) => ability.activation).filter((activation) => activation !== 'N/A')
}

export function computeGuessInfo(guess: Joker, target: Joker): GuessInfo {
  return {
    name: { match: guess.name === target.name, value: guess.name },
    abilities: computeArrayOverlap(getEffects(guess.abilities), getEffects(target.abilities)),
    activation: computeArrayOverlap(
      getActivations(guess.abilities),
      getActivations(target.abilities),
    ),
    rarity: { match: guess.rarity === target.rarity, value: guess.rarity },
    compatibility: computeCompatibilityOverlap(guess, target),
    cards: computeCardsOverlap(guess, target),
    hands: computeArrayOverlap(guess.hands, target.hands),
  }
}

const COMPLETE_POINTS = 3
const PARTIAL_POINTS = 1
const NONE_POINTS = 0

function overlapTypeToPoints(overlap: OverlapType): number {
  switch (overlap) {
    case 'complete':
      return COMPLETE_POINTS
    case 'partial':
      return PARTIAL_POINTS
    case 'none':
      return NONE_POINTS
  }
}

export function calculateScore(info: GuessInfo): number {
  let score = 0
  let maxScore = 0

  score += overlapTypeToPoints(info.abilities.overlap)
  maxScore += COMPLETE_POINTS

  score += overlapTypeToPoints(info.activation.overlap)
  maxScore += COMPLETE_POINTS

  score += info.rarity.match ? COMPLETE_POINTS : NONE_POINTS
  maxScore += COMPLETE_POINTS

  const compatibilityAttrs = Object.keys(info.compatibility.value).length
  score += info.compatibility.value.copyable ? PARTIAL_POINTS / compatibilityAttrs : NONE_POINTS
  maxScore += PARTIAL_POINTS / compatibilityAttrs
  score += info.compatibility.value.eternal ? PARTIAL_POINTS / compatibilityAttrs : NONE_POINTS
  maxScore += PARTIAL_POINTS / compatibilityAttrs
  score += info.compatibility.value.perishable ? PARTIAL_POINTS / compatibilityAttrs : NONE_POINTS
  maxScore += PARTIAL_POINTS / compatibilityAttrs

  const cardsAttrs = Object.keys(info.cards.value).length
  score += overlapTypeToPoints(info.cards.value.ranks.overlap) / cardsAttrs
  maxScore += COMPLETE_POINTS / cardsAttrs
  score += overlapTypeToPoints(info.cards.value.suits.overlap) / cardsAttrs
  maxScore += COMPLETE_POINTS / cardsAttrs
  score += overlapTypeToPoints(info.cards.value.enhancements.overlap) / cardsAttrs
  maxScore += COMPLETE_POINTS / cardsAttrs
  score += overlapTypeToPoints(info.cards.value.consumables.overlap) / cardsAttrs
  maxScore += COMPLETE_POINTS / cardsAttrs

  score += overlapTypeToPoints(info.hands.overlap)
  maxScore += COMPLETE_POINTS

  // prevent 100% on incorrect jokers but don't penalise too much
  score += info.name.match ? 1 : NONE_POINTS
  maxScore += 1

  return score / maxScore
}

export type ScoreColor = 'red' | 'amber' | 'green'

export function getScoreColour(score: number): ScoreColor {
  if (score <= 0.35) {
    return 'red'
  } else if (score <= 0.7) {
    return 'amber'
  }
  return 'green'
}

export function getScoreEmoji(score: number): string {
  if (score === 1) {
    return '✅'
  } else if (score <= 0.35) {
    return '🟥'
  } else if (score <= 0.7) {
    return '🟨'
  }
  return '🟩'
}

export function getGuessesText(guesses: Guess[]): string {
  return guesses.map((guess) => getScoreEmoji(guess.score)).join('')
}

export function getSticker(numGuesses: number): Sticker {
  switch (numGuesses) {
    case 1:
    case 2:
      return 'gold'
    case 3:
      return 'orange'
    case 4:
      return 'purple'
    case 5:
      return 'blue'
    case 6:
      return 'black'
    case 7:
      return 'green'
    case 8:
      return 'red'
  }
  return 'white'
}
