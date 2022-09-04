import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Game } from "game-engine";

function App() {
    const [game] = useState(new Game());
    const board = [];

    console.log("game.getState()", game.getState());

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
