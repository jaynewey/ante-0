<div align="center">

<img width="32" src="public/favicon.ico">

# Ante 0

</div>

> 🃏 Balatro Joker guessing game

[Play now!](https://jaynewey.github.io/ante-0)

## Intro

Ante 0 is a game where the object is to guess the mystery [Balatro](https://www.playbalatro.com/) joker 
of the day in as few guesses as possible.

### How to play

Find the mystery joker in as few guesses as possible.

1. Type a joker's name into the Search bar.
2. Hit Guess
3. Use the match clues to get closer to the mystery joker.
4. Repeat until you guess correctly!

You can play at https://jaynewey.github.io/ante-0.

### How it works

Ante 0 is a front-end application written using Vue, Typescript and Tailwind. It has no back-end.
The current date is used as the random number seed to ensure the selected joker is consistent for the same day.

The joker data is largely scraped from the [Balatro Wiki](https://balatrowiki.org/w/Jokers),
with adjustments to reduce ambiguity and fit the mechanics of the game.

## Contributing

Contributions are appreciated. Please see the following to get started:

### Dependencies

#### Prerequisite

* You'll need [`bun`](https://bun.com/).

Install dependencies with:

```sh
bun install
```

### Development

Run the dev server with:

```sh
bun dev
```

### Building

Type-check, compile and minify with:

```sh
bun run build
```

Preview the built code with:

```sh
bun preview
```

### Linting

Lint the codebase with:

```sh
bun lint
```

### Formatting

Format the codebase with:

```sh
bun format
```
