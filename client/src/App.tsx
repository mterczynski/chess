import "./App.css";
import { GameClientContextProvider } from "./GameClientContext";
import { GameEngineContextProvider } from "./GameEngineContext";
import { SelectionScreens } from "./selection-screens/SelectionScreens";

function App() {
    return (
        <div className="App">
            <GameEngineContextProvider>
                <GameClientContextProvider>
                    <SelectionScreens></SelectionScreens>
                </GameClientContextProvider>
            </GameEngineContextProvider>
        </div>
    );
}

export default App;
