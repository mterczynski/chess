import { Player } from "game-engine";
import React, { useState } from "react";

// todo - consider removing this context in favor of moving its contents to BoardContext
/** Context responsible for handling general client app data (not related to board) */
export const GameClientContext = React.createContext<{
    playerSelection: Player | null;
    setPlayerSelection: React.Dispatch<React.SetStateAction<Player | null>>;
}>(null as any);

export const GameClientContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [playerSelection, setPlayerSelection] = useState<Player | null>(null);

    return (
        <GameClientContext.Provider
            value={{
                playerSelection,
                setPlayerSelection,
            }}
        >
            {children}
        </GameClientContext.Provider>
    );
};
