# LetsRandomize

Static source for `letsrandomize.org`.

Free random generators, human benchmark tests, and interactive tools.

## Project

LetsRandomize is a browser-based random tools site focused on list, order, picker, team, and fair-selection workflows.

Current operating focus:

- Primary cluster: `list / order / picker / team`
- Secondary cluster: `fair selection / classroom groups`
- Deprioritized: generic password, generic number, simple coin/dice

## Structure

```text
public/        Static site published to Cloudflare Pages
docs/          Deployment and project notes
scripts/       Local deployment helpers
```

The site has no backend. Randomization runs in the browser.

## Features

- **20+ Random Generators**: numbers, names, passwords, colors, animals, countries, words, dice, coins
- **Human Benchmark Suite**: reaction time, CPS test, aim trainer, memory test, typing speed, chimp test
- **Interactive Tools**: spin the wheel, yes/no generator, team generator, list randomizer
- **Educational Content**: guides on randomness, probability, and strong password best practices

## Live Site

[letsrandomize.org](https://letsrandomize.org) - all tools are free, no signup required.

## Popular Tools

| Tool | Description |
|---|---|
| [List Randomizer](https://letsrandomize.org/tools/list-randomizer/) | Shuffle lists and randomize names, teams, winners, and tasks |
| [Random Team Generator](https://letsrandomize.org/tools/random-team-generator/) | Split classes, sports groups, and work groups into teams |
| [Spin the Wheel](https://letsrandomize.org/tools/spin-the-wheel/) | Interactive spinning wheel with custom options |
| [Typing Speed Test](https://letsrandomize.org/tools/typing-speed-test/) | Test WPM typing speed |
| [Reaction Time Test](https://letsrandomize.org/tools/reaction-time-test/) | Measure reaction time in milliseconds |

## Deployment

Current Cloudflare Pages project:

```text
letsrandomize
```

Current production domains:

```text
letsrandomize.org
www.letsrandomize.org
letsrandomize.pages.dev
```

See `docs/DEPLOYMENT.md`.

## License

MIT
