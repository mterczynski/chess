import { Game } from "game-engine";
import React, { useRef } from "react";

export const GameContext = React.createContext<Game>(null as any);

export const GameContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const game = useRef(new Game());

    return (
        <GameContext.Provider value={game.current}>
            {children}
        </GameContext.Provider>
    );
};
