import "./App.css";
import { GameClientContextProvider } from "./GameClientContext";
import { GameEngineContextProvider } from "./GameEngineContext";
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
