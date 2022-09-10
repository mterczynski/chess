import "./App.css";
import { Board } from "./board/Board";
import { BoardContextProvider } from "./board/BoardContext";
import { GameContextProvider } from "./GameContext";

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <BoardContextProvider>
                    <Board></Board>
                </BoardContextProvider>
            </GameContextProvider>
        </div>
    );
}

export default App;
