import { useContext } from "react";
import { Board } from "./board/Board";
import { GameClientContext } from "./GameClientContext";
import { PlayerSelectionScreen } from "./selection-screens/PlayerSelectionScreen";

export const GameScreenSelector = () => {
    const gameClientContext = useContext(GameClientContext);

    return gameClientContext.playerSelection === null ? (
        <PlayerSelectionScreen />
    ) : (
        <Board />
    );
};
