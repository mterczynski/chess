import styled from "styled-components";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { GameClientContextProvider } from "./contexts/GameClientContext";
import { GameEngineContextProvider } from "./contexts/GameEngineContext";
import { GeminiSettingsContextProvider } from "./gemini/GeminiSettingsContext";
import { GameScreenSelector } from "./GameScreenSelector";

const SettingsIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <GameEngineContextProvider>
                    <GameClientContextProvider>
                        <GeminiSettingsContextProvider>
                            <>
                                <SettingsIcon>⚙️</SettingsIcon>
                                <GameScreenSelector />
                            </>
                        </GeminiSettingsContextProvider>
                    </GameClientContextProvider>
                </GameEngineContextProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
