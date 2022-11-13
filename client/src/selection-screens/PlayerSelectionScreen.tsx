import { Player } from "game-engine";
import { useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { Button } from "./Button";
import { Header } from "./Header";
import { SelectionScreen } from "./SelectionScreen";

export const PlayerSelectionScreen = () => {
    const gameClientContext = useContext(GameClientContext);

    return (
        <SelectionScreen>
            <Header>Play as:</Header>

            <div>
                <Button
                    onClick={() => gameClientContext.selectPlayer(Player.WHITE)}
                >
                    White
                </Button>
                <Button
                    onClick={() => gameClientContext.selectPlayer(Player.BLACK)}
                    background="#222"
                    color="white"
                >
                    Black
                </Button>
            </div>
        </SelectionScreen>
    );
};
