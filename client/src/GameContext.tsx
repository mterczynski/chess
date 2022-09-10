import { Board, Game, GameState, Move, Player } from "game-engine";
import React, { useCallback, useRef, useState } from "react";
import { playerSide } from "./board/playerSide";

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

        const isDraw = [
            GameState.DRAW_BY_50_MOVE_RULE,
            GameState.DRAW_BY_75_MOVE_RULE,
            GameState.DRAW_BY_AGREEMENT,
            GameState.DRAW_BY_INSUFFICIENT_MATERIAL,
            GameState.DRAW_BY_REPETITION,
            GameState.DRAW_BY_STALEMATE,
        ].includes(game.current.getState());

        if (playerSide === Player.WHITE) {
            if (game.current.getState() === GameState.WHITE_WON) {
                alert("You won");
            } else if (game.current.getState() === GameState.BLACK_WON) {
                alert("You lost");
            } else if (isDraw) {
                alert("Game drawn"); // TODO - add more descriptive messages that mention draw reason
            }
        } else {
            // TODO
        }
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
