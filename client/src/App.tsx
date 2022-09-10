import { Game } from "game-engine";
import { useRef } from "react";
import "./App.css";
import { Board } from "./board/Board";
import { BoardContextProvider } from "./board/BoardContext";
import { GameContextProvider } from "./GameContext";

function App() {
    const gameRef = useRef(new Game());

    return (
        <div className="App">
            <GameContextProvider>
                <BoardContextProvider>
                    <Board state={gameRef.current.getBoard()}></Board>
                </BoardContextProvider>
            </GameContextProvider>
        </div>
    );
}

export default App;
