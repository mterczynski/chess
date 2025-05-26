import "./App.css";
import { GameClientContextProvider } from "./contexts/GameClientContext";
import { GameEngineContextProvider } from "./contexts/GameEngineContext";
import { GameScreenSelector } from "./GameScreenSelector";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Board } from "./board/Board";
import { LobbyList } from "./menus/LobbyList";

function App() {
    return (
        <div className="App">
            <GameEngineContextProvider>
                <GameClientContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<GameScreenSelector />} />
                            <Route path="/lobby/:id" element={<Board />} />
                            <Route path="/lobbies" element={<LobbyList />} />
                        </Routes>
                    </BrowserRouter>
                </GameClientContextProvider>
            </GameEngineContextProvider>
        </div>
    );
}

export default App;
