import "./App.css";
import { GameClientContextProvider } from "./contexts/GameClientContext";
import { GameEngineContextProvider } from "./contexts/GameEngineContext";
import { GameScreenSelector } from "./GameScreenSelector";

function App() {
    return (
        <div className="App">
            <GameEngineContextProvider>
                <GameClientContextProvider>
                    <GameScreenSelector />
                </GameClientContextProvider>
            </GameEngineContextProvider>
        </div>
    );
}

export default App;
