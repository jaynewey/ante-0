import { type BackgroundColours } from './types'

export const REPO_URL: string = 'https://github.com/jaynewey/ante-0/'
export const SHARE_URL: string = 'https://jaynewey.github.io/ante-0/'

export const BACKGROUND_GREY: BackgroundColours = {
  outside: {
    r: 2,
    g: 6,
    b: 23,
  },
  inside: {
    r: 15,
    g: 23,
    b: 42,
  },
  between: {
    r: 107,
    g: 114,
    b: 128,
  },
}

export const BACKGROUND_GREEN: BackgroundColours = {
  outside: {
    r: 1,
    g: 24,
    b: 19,
  },
  inside: {
    r: 2,
    g: 44,
    b: 34,
  },
  between: {
    r: 5,
    g: 150,
    b: 105,
  },
}

export const BACKGROUND_AMBER: BackgroundColours = {
  outside: {
    r: 25,
    g: 10,
    b: 0,
  },
  inside: {
    r: 69,
    g: 26,
    b: 3,
  },
  between: {
    r: 161,
    g: 98,
    b: 7,
  },
}

export const BACKGROUND_RED: BackgroundColours = {
  outside: {
    r: 41,
    g: 10,
    b: 10,
  },
  inside: {
    r: 69,
    g: 10,
    b: 10,
  },
  between: {
    r: 185,
    g: 28,
    b: 28,
  },
}

export const DEFAULT_BACKGROUND = BACKGROUND_GREY
