# Chess

This repository contains `game-engine` and `client` - a UI made in React for playing single player chess games.

## ⚙️ Setup

Prerequisites:

- NodeJS
- npm

| Tool Versions         | Node.js | npm    |
|----------------------|---------|--------|
| Supported (variant 1) | 24.1.0  | 11.3.0 |
| Supported (variant 2) | 18.20.8 | 8.20.8 |

```bash
# This command will install all required dependencies in all packages (thanks to npm workspaces)
npm i
```

## Available scripts

-   🚀 `start`: runs the `client` application
-   🔗 `postinstall` - links the packages (run automatically after `npm install`)
-   📦 `build`: links the packages and builds both `client` and `game-engine`
-   🧽 `cleanup`: clears all generated/built/installed content (such as /coverage, /dist, /node_modules)
-   🧪 `test`: runs the tests in `game-engine` (and in `client` when implemented)
-   🧪 `test:watch`: same as above but in watch mode

## 🚧 Work progress

| Repository    | Progress     | Comments                                                                                              |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `game-engine` | 🟩🟩🟩🟩🟩⬛ | mostly done, performance can be improved                                                              |
| `client`      | 🟩🟩🟩🟩🟩⬛ | movable pieces, en passant, castling, checks, checkmates, promotions are working, both sides playable (but there are responsivness issuesP) |

## Preview

<img src="./preview.png" alt="" width="400" height="400"/>
