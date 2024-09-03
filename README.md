# Chess

This repository contains `game-engine` and `client` - a UI made in React for playing single player chess games.

## ⚙️ Setup

Prerequisites:

-   NodeJS

```bash
# This command will install all required dependencies in all packages (thanks to npm workspaces)
npm i
```

## Available scripts

-   🚀 `start`: runs the `client` application
-   🧪 `test`: runs the tests in `game-engine` (and in `client` when implemented)
-   🧪 `test:watch`: same as above but in watch mode

## 🚧 Work progress

| Repository    | Progress     | Comments                                                                         |
| ------------- | ------------ | -------------------------------------------------------------------------------- |
| `game-engine` | 🟩🟩🟩🟩🟩⬛ | mostly done, performance can be improved                                      |
| `client`      | 🟩🟩🟩🟩⬛⬛ | movable pieces, en passant, castling, checks, checkmates, promotions are working, both sides playable (but without perspective change on black side) |

## Preview

<img src="./preview.jpg" alt="" width="400" height="400"/>
