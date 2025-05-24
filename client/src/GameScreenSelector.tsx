import { useContext, useState } from "react";
import { Board } from "./board/Board";
import { GameClientContext } from "./GameClientContext";
import { PlayerSelectionScreen } from "./PlayerSelectionScreen";
import { ModeSelectionScreen, GameMode } from "./ModeSelectionScreen";

export const GameScreenSelector = () => {
    const gameClientContext = useContext(GameClientContext);
    const [mode, setMode] = useState<GameMode | null>(null);

    if (!mode) {
        return <ModeSelectionScreen onSelect={setMode} />;
    }

    if (gameClientContext.playerSelection === null) {
        return <PlayerSelectionScreen mode={mode} />;
    }

    return <Board />;
};
