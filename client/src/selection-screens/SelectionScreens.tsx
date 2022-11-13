import { useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { GameMode, LobbyDecision } from "./SelectorScreenEnums";
import { GameModeSelectionScreen } from "./GameModeSelectionScreen";
import { LobbyDecisionScreen } from "./LobbyDecisionScreen";
import { CreateLobbyScreen } from "./CreateLobbyScreen";
import { JoinLobbyScreen } from "./JoinLobbyScreen";
import { Player } from "game-engine";
import { Board } from "../board/Board";
import { PlayerSelectionScreen } from "./PlayerSelectionScreen";

export const SelectionScreens = () => {
    const gameClientContext = useContext(GameClientContext);

    switch (gameClientContext.gameMode) {
        case null:
            return <GameModeSelectionScreen />;
        case GameMode.Offline:
            switch (gameClientContext.playerSelection) {
                case Player.WHITE:
                case Player.BLACK:
                    return <Board />;
                default:
                    return <PlayerSelectionScreen />;
            }
        case GameMode.Online:
            switch (gameClientContext.lobbyDecision) {
                case LobbyDecision.Create:
                    return <CreateLobbyScreen />;
                case LobbyDecision.Join:
                    return <JoinLobbyScreen />;
                default:
                    return <LobbyDecisionScreen />;
            }
    }
};
