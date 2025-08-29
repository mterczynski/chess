import "./App.css";
import { GameClientContextProvider } from "./contexts/GameClientContext";
import { GameEngineContextProvider } from "./contexts/GameEngineContext";
import { GameScreenSelector } from "./GameScreenSelector";
import { SettingsButtonAndPopup } from "./menus/SettingsButtonAndPopup";

function App() {
    return (
        <div className="App">
            <GameEngineContextProvider>
                <GameClientContextProvider>
                    <>
                        <SettingsButtonAndPopup />
                        <GameScreenSelector />
                    </>
                </GameClientContextProvider>
            </GameEngineContextProvider>
        </div>
    );
}

export default App;
