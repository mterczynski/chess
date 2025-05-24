import { useContext } from "react";
import { Board } from "./board/Board";
import { GameClientContext } from "./GameClientContext";
import { PlayerSelectionScreen } from "./PlayerSelectionScreen";
import { ModeSelectionScreen } from "./ModeSelectionScreen";
import { GameMode } from "./GameMode";

export const GameScreenSelector = () => {
    const gameClientContext = useContext(GameClientContext);
    const mode = gameClientContext.gameMode;
    const setMode = gameClientContext.setGameMode;

    // Skip player selection in offline PvP mode
    if (!mode) {
        return <ModeSelectionScreen onSelect={setMode} />;
    }

    if (mode === GameMode.VS_PLAYER_OFFLINE) {
        return <Board />;
    }

    if (gameClientContext.playerSelection === null) {
        return <PlayerSelectionScreen mode={mode} />;
    }

    return <Board />;
};
