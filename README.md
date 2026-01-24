# Chess

This repository contains `game-engine` and `client` - a UI made in React for playing single player chess games.

## ⚙️ Setup

Prerequisites:

- [NodeJS](https://nodejs.org/en/download)
- npm (comes installed with NodeJS)
- [PostgreSQL](https://www.postgresql.org/download/)
- [pgAdmin](https://www.pgadmin.org/download/)
- [Insomnia REST API Client](https://insomnia.rest/download)

| Tool Versions         | Node.js | npm    |
|----------------------|---------|--------|
| Supported (variant 1) | 24.1.0  | 11.3.0 |
| Supported (variant 2) | 18.20.8 | 8.20.8 |

```bash
# This command will install all required dependencies in all packages (thanks to npm workspaces)
npm i
```

Setup pgAdmin and PostgreSQL (described in detail in [Server's Readme](./server/README.md))

## Available npm scripts

-   🚀 `start`: runs the `client` application on http://localhost:5173 (if available)
-   🚀 `start:server`: runs the `server` application on http://localhost:3000 (if available)
-   🔗 `postinstall` - builds the game-engine (run automatically after `npm install`)
-   📦 `build`: builds all packages (for deployment, not required for local development)
-   🧽 `cleanup`: clears all generated/built/installed content (such as /coverage, /dist, /node_modules)
-   🧪 `test`: runs the tests in all repositories (todo: make it work for e2e server tests too)
-   🧪 `test:watch`: same as above but in watch mode
-   🧪 `test:coverage`: runs all tests, produces coverage (open `coverage\lcov-report\index.html` in the browser to see the results)

## 🚧 Work progress

| Repository    | Progress     | Comments                                                                                              |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `game-engine` | 🟩🟩🟩🟩⬛⬛ | core logic is mostly implemented, performance can be improved, missing draw by agreement, no clocks, bots are too easy                                                              |
| `client`      | 🟩🟩🟩🟩⬛⬛ | game engine is implemented, both sides are playable, but are responsivness issues |
| `server`      | 🟩⬛⬛⬛⬛⬛ | lobby creation, a few unrefined endpoints, makinvg moves works, insomnia collection, some tests |

## Preview

<img src="./preview.png" alt="" width="400" height="400"/>
