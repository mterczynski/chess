import { Game } from "game-engine";
import { useRef } from "react";
import "./App.css";
import { Board } from "./board/Board";

function App() {
    const gameRef = useRef(new Game());

    return (
        <div className="App">
            <Board state={gameRef.current.getBoard()}></Board>
        </div>
    );
}

export default App;
