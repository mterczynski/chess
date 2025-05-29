import { useContext, useState } from "react";
import { Board } from "./board/Board";
import { GameClientContext } from "./contexts/GameClientContext";
import { PlayerSelectionScreen } from "./menus/PlayerSelectionScreen";
import { ModeSelectionScreen } from "./menus/ModeSelectionScreen";
import { GameMode } from "./GameMode";
import { LobbyList } from "./menus/LobbyList";
import { RegisterUserForm } from "./menus/RegisterUserForm";
import { settings } from "./settings";

export const GameScreenSelector = () => {
    const gameClientContext = useContext(GameClientContext);
    const mode = gameClientContext.gameMode;
    const setMode = gameClientContext.setGameMode;
    const username = gameClientContext.username;

    // Check for JWT token in localStorage (using env var)
    const jwtKey = settings.localStorageKeys.jwt;
    const hasJwt =
        typeof window !== "undefined" && localStorage.getItem(jwtKey);

    if (!mode) {
        return <ModeSelectionScreen onSelect={setMode} />;
    }

    // Skip player selection in offline PvP mode
    if (mode === GameMode.VS_PLAYER_OFFLINE) {
        return <Board />;
    }

    if (mode === GameMode.VS_PLAYER_ONLINE) {
        // Show register user form first, then lobby list
        if (!username && !hasJwt) {
            return <RegisterUserForm />;
        }
        return <LobbyList />;
    }

    if (
        mode === GameMode.VS_BOT &&
        gameClientContext.playerSelection === null
    ) {
        return <PlayerSelectionScreen mode={mode} />;
    }

    return <Board />;
};
