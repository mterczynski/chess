import { Button } from "./Button";
import { useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { SelectionScreen } from "./SelectionScreen";
import { LobbyDecision } from "./SelectorScreenEnums";
import { Header } from "./Header";

export const LobbyDecisionScreen = () => {
    const gameClientContext = useContext(GameClientContext);

    return (
        <SelectionScreen>
            <Header>Join or create lobby:</Header>
            <div>
                <Button
                    onClick={() =>
                        gameClientContext.selectLobbyDecision(
                            LobbyDecision.Join
                        )
                    }
                >
                    Join existing
                </Button>
                <Button
                    onClick={() =>
                        gameClientContext.selectLobbyDecision(
                            LobbyDecision.Create
                        )
                    }
                    background="#222"
                    color="white"
                >
                    Create a new one
                </Button>
            </div>
        </SelectionScreen>
    );
};
