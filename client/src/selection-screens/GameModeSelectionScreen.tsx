import { Button } from "./Button";
import { useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { SelectionScreen } from "./SelectionScreen";
import { GameMode } from "./SelectorScreenEnums";
import { Header } from "./Header";

export const GameModeSelectionScreen = () => {
    const gameClientContext = useContext(GameClientContext);

    return (
        <SelectionScreen>
            <Header>Select game mode:</Header>
            <div>
                <Button
                    onClick={() =>
                        gameClientContext.selectGameMode(GameMode.Online)
                    }
                >
                    Online 🌐
                </Button>
                <Button
                    onClick={() =>
                        gameClientContext.selectGameMode(GameMode.Offline)
                    }
                    background="#222"
                    color="white"
                >
                    Versus AI 🤖
                </Button>
            </div>
        </SelectionScreen>
    );
};
