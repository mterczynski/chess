import { useContext, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { GameClientContextProvider } from "./contexts/GameClientContext";
import { GameEngineContextProvider } from "./contexts/GameEngineContext";
import { SettingsProvider, SettingsContext } from "./contexts/SettingsContext";
import { GameScreenSelector } from "./GameScreenSelector";
import { SettingsPanel } from "./menus/SettingsPanel";

const SettingsIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 100;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

function AppContent() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { settings } = useContext(SettingsContext);

    return (
        <div className="App" style={{ background: settings.colors.background }}>
            <AuthProvider>
                <GameEngineContextProvider>
                    <GameClientContextProvider>
                        <>
                            <SettingsIcon onClick={() => setIsSettingsOpen(true)}>
                                ⚙️
                            </SettingsIcon>
                            <GameScreenSelector />
                            {isSettingsOpen && (
                                <SettingsPanel
                                    onClose={() => setIsSettingsOpen(false)}
                                />
                            )}
                        </>
                    </GameClientContextProvider>
                </GameEngineContextProvider>
            </AuthProvider>
        </div>
    );
}

function App() {
    return (
        <SettingsProvider>
            <AppContent />
        </SettingsProvider>
    );
}

export default App;
