import { Board, Game, GameState, Move, Player } from "game-engine";
import React, { useCallback, useRef, useState } from "react";
import { playerSide } from "./board/playerSide";
import { handleGameEnd } from "./handle-game-end";

/** Context responsible for communicating with game-engine and exposing Game instance data */
export const GameEngineContext = React.createContext<{
    move: (move: Move) => void;
    availableMovesForPlayer: Move[];
    currentPlayer: Player | null;
    state: GameState;
    board: Board;
}>(null as any);

export const GameEngineContextProvider = ({
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
        // setTimeout is used to ensure that the last move is shown before showing an alert
        setTimeout(() => {
            handleGameEnd(game.current, playerSide);
        });
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
        <GameEngineContext.Provider
            value={{
                move,
                availableMovesForPlayer,
                currentPlayer,
                state,
                board,
            }}
        >
            {children}
        </GameEngineContext.Provider>
    );
};
