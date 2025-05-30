import { useContext } from "react";
import { Board } from "./board/Board";
import { GameClientContext } from "./contexts/GameClientContext";
import { PlayerSelectionScreen } from "./menus/PlayerSelectionScreen";
import { ModeSelectionScreen } from "./menus/ModeSelectionScreen";
import { GameMode } from "./GameMode";
import OnlineModeScreenSelector from "./OnlineModeScreenSelector";

export const GameScreenSelector = () => {
    const gameClientContext = useContext(GameClientContext);
    const mode = gameClientContext.gameMode;
    const setMode = gameClientContext.setGameMode;

    if (!mode) {
        return <ModeSelectionScreen onSelect={setMode} />;
    }

    // Skip player selection in offline PvP mode
    if (mode === GameMode.VS_PLAYER_OFFLINE) {
        return <Board />;
    }

    if (mode === GameMode.VS_PLAYER_ONLINE) {
        return <OnlineModeScreenSelector />;
    }

    if (
        mode === GameMode.VS_BOT &&
        gameClientContext.playerSelection === null
    ) {
        return <PlayerSelectionScreen mode={mode} />;
    }

    return <Board />;
};
