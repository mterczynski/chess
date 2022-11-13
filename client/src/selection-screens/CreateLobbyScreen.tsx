import { Player } from "game-engine";
import { useContext, useState } from "react";
import { GameClientContext } from "../GameClientContext";
import { Button } from "./Button";
import { Header } from "./Header";
import { SelectionScreen } from "./SelectionScreen";

enum PlayerSelection {
    White = "White",
    Black = "Black",
    Random = "Random",
}

export const CreateLobbyScreen = () => {
    const gameClientContext = useContext(GameClientContext);
    const [playerOptionsState, selectPlayerOptionsState] = useState(
        PlayerSelection.Random
    );

    return (
        <SelectionScreen>
            <Header>Create lobby:</Header>

            <div>
                <form>
                    <label>
                        Lobby name:
                        <input name="name"></input>
                    </label>
                    <label>
                        Lobby password (optional):
                        <input name="password" type="password"></input>
                    </label>
                    <label>
                        Play as:
                        <select
                            value={playerOptionsState}
                            onChange={(event) =>
                                selectPlayerOptionsState(
                                    event.target.value as PlayerSelection
                                )
                            }
                        >
                            <option value={PlayerSelection.Black}>Black</option>
                            <option value={PlayerSelection.White}>White</option>
                            <option value={PlayerSelection.Random}>
                                Random
                            </option>
                        </select>
                    </label>

                    <button type="submit">Create lobby</button>
                </form>
            </div>
        </SelectionScreen>
    );
};
