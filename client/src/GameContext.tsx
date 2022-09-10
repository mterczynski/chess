import { Board, Game, GameState, Move, Player } from "game-engine";
import React, { useCallback, useRef, useState } from "react";

export const GameContext = React.createContext<{
    move: (move: Move) => void;
    availableMovesForPlayer: Move[];
    currentPlayer: Player | null;
    state: GameState;
    board: Board;
}>(null as any);

export const GameContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const game = useRef(new Game());

    const move = useCallback((move: Move) => {
        game.current.move(move);
        setAvailableMovesForPlayer(game.current.getAvailableMovesForPlayer());
        setCurrentPlayer(game.current.getCurrentPlayer());
        setState(game.current.getState());
        setBoard(game.current.getBoard());
    }, []);

    const [availableMovesForPlayer, setAvailableMovesForPlayer] = useState(
        game.current.getAvailableMovesForPlayer()
    );
    const [currentPlayer, setCurrentPlayer] = useState(
        game.current.getCurrentPlayer()
    );
    const [state, setState] = useState(game.current.getState());
    const [board, setBoard] = useState(game.current.getBoard());

    return (
        <GameContext.Provider
            value={{
                move,
                availableMovesForPlayer,
                currentPlayer,
                state,
                board,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
