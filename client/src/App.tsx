import "./App.css";
import { BoardContextProvider } from "./board/BoardContext";
import { GameClientContextProvider } from "./GameClientContext";
import { GameEngineContextProvider } from "./GameEngineContext";
import { GameScreenSelector } from "./GameScreenSelector";

function App() {
    return (
        <div className="App">
            <GameEngineContextProvider>
                <BoardContextProvider>
                    <GameClientContextProvider>
                        <GameScreenSelector />
                    </GameClientContextProvider>
                </BoardContextProvider>
            </GameEngineContextProvider>
        </div>
    );
}

export default App;
