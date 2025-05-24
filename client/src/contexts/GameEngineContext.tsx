import { Board, Game, GameState, Move, Player } from "game-engine";
import React, { useCallback, useRef, useState } from "react";

/** Context responsible for communicating with game-engine and exposing Game instance data */
export const GameEngineContext = React.createContext<{
    move: (move: Move) => void;
    availableMovesForPlayer: Move[];
    currentPlayer: Player | null;
    state: GameState;
    board: Board;
    restartGame: () => void;
    moveHistory: Move[];
}>(null as any);

export const GameEngineContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const game = useRef(new Game());

    const syncState = () => {
        setCurrentPlayer(game.current.getCurrentPlayer());
        setAvailableMovesForPlayer(game.current.getAvailableMovesForPlayer());
        setState(game.current.getState());
        setBoard(game.current.getBoard());
        setMoveHistory(game.current.getMoveHistory());
    };

    const move = useCallback((move: Move) => {
        game.current.move(move);
        syncState();
    }, []);

    const restartGame = useCallback(() => {
        game.current = new Game();
        syncState();
    }, []);

    var initial = game.current.getAvailableMovesForPlayer();

    const [availableMovesForPlayer, setAvailableMovesForPlayer] =
        useState(initial);
    const [currentPlayer, setCurrentPlayer] = useState(
        game.current.getCurrentPlayer()
    );
    const [state, setState] = useState(game.current.getState());
    const [board, setBoard] = useState(game.current.getBoard());
    const [moveHistory, setMoveHistory] = useState(
        game.current.getMoveHistory()
    );

    return (
        <GameEngineContext.Provider
            value={{
                move,
                availableMovesForPlayer,
                currentPlayer,
                state,
                board,
                moveHistory,
                restartGame,
            }}
        >
            {children}
        </GameEngineContext.Provider>
    );
};
