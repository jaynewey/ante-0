import seedrandom from 'seedrandom'
import jokers from './assets/jokers.json'

export const typedJokers = jokers as Joker[]

export const ABILITIES = [
  '+ Mult',
  'X Mult',
  '+ Chips',
  'Effect',
  'Economy',
  'Self Destruct',
  'Retrigger',
  'Scale',
] as const

export type AbilityType = (typeof ABILITIES)[number]
type RawAbilityType =
  | AbilityType
  | 'Scale Up'
  | 'Scale Down'
  | 'Scale Up with Reset'
  | 'Chance to Self Destruct'
  | 'Requirement to Activate'
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary'
export type Suit = 'Heart' | 'Diamond' | 'Spade' | 'Club'
export type Compatibility = {
  copyable: boolean
  perishable: boolean
  eternal: boolean
}
export type Ability = {
  ability: RawAbilityType[]
  activation: string
}
export type Joker = {
  name: string
  effect: string
  cost: number | null
  rarity: Rarity
  unlock_requirement: string
  abilities: Ability[]
  compatibility: Compatibility
  ranks: string[]
  suits: Suit[]
  hands: string[]
  enhancements: string[]
  consumables: string[]
}

function simplifyText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function getJokerByName(name: string): Joker | undefined {
  return typedJokers.find((joker) => simplifyText(joker.name) === simplifyText(name))
}

export function searchJokers(search: string): Joker[] {
  return typedJokers.filter((joker) => simplifyText(joker.name).startsWith(simplifyText(search)))
}

export function getMysteryJoker(): Joker {
  const today = new Date()
  const todayIso = today.toISOString().slice(0, 10)
  const rng = seedrandom(todayIso)
  const index = Math.floor(rng() * (jokers.length - 1))
  const mysteryJoker = typedJokers[index] ?? typedJokers[0]
  if (!mysteryJoker) throw Error('Cannot get the mystery joker') // should be unreachable
  return mysteryJoker
}
