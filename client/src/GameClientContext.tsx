import { GameState, Move, Player, mapIndexToChessFile,
    mapRankIndexToRank,
    Position
} from "game-engine";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GameEngineContext } from "./GameEngineContext";
import { handleGameEnd } from "./handle-game-end";

interface SelectedPiece {
    fileIndex: number;
    tileIndex: number;
}

/** Context responsible for handling client specific events & data */
export const GameClientContext = React.createContext<{
    selectedPiece: SelectedPiece | null;
    setSelectedPiece: React.Dispatch<
        React.SetStateAction<SelectedPiece | null>
    >;
    availableMoves: Move[];
    setAvailableMoves: React.Dispatch<React.SetStateAction<Move[]>>;
    promotionMenuPosition: Position | null;
    setPromotionMenuPosition: React.Dispatch<
        React.SetStateAction<Position | null>
    >;
    selectPlayer: (player: Player | null) => void;
    playerSelection: Player | null;
    playerTurnTimeoutRef: React.MutableRefObject<any>;
}>({} as any);

export const GameClientContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(
        null
    );
    const [playerSelection, setPlayerSelection] = useState<Player | null>(null);
    const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
    const [promotionMenuPosition, setPromotionMenuPosition] =
        useState<Position | null>(null); // stores null or promoting position

    const {
        availableMovesForPlayer,
        move: engineMove,
        state,
        currentPlayer,
    } = useContext(GameEngineContext);

    const playerTurnTimeoutRef = useRef<any>(null);

    const makeRandomMove = useCallback(() => {
        const randomMove = _.sample(availableMovesForPlayer) as Move;

        engineMove(randomMove);
    }, [availableMovesForPlayer, engineMove]);

    const selectPlayer = useCallback((player: Player | null) => {
        setPlayerSelection(player);
    }, []);

    useEffect(() => {
        if (
            playerSelection !== null &&
            currentPlayer !== playerSelection &&
            (state === GameState.UNSTARTED || state === GameState.IN_PROGRESS)
        ) {
            if (playerTurnTimeoutRef.current) {
                clearTimeout(playerTurnTimeoutRef.current);
            }
            playerTurnTimeoutRef.current = setTimeout(() => {
                makeRandomMove();
            }, 650);
        }
    }, [currentPlayer, makeRandomMove, playerSelection, state]);

    useEffect(() => {
        // setTimeout used to display last played move before showing an alert
        setTimeout(() => {
            handleGameEnd(state, playerSelection!);
        });
    }, [playerSelection, state]);

    // update available moves after selecting a piece
    useEffect(() => {
        if (!selectedPiece) {
            setAvailableMoves([]);
            return;
        }

        const availableSelectedPieceMoves = availableMovesForPlayer.filter(
            (move) =>
                move.from.file ===
                    mapIndexToChessFile(selectedPiece.fileIndex) &&
                move.from.rank === mapRankIndexToRank(selectedPiece.tileIndex)
        );
        setAvailableMoves(availableSelectedPieceMoves);
    }, [selectedPiece, availableMovesForPlayer]);

    return (
        <GameClientContext.Provider
            value={{
                selectedPiece,
                setSelectedPiece,
                availableMoves,
                setAvailableMoves,
                promotionMenuPosition,
                setPromotionMenuPosition,
                selectPlayer,
                playerSelection,
                playerTurnTimeoutRef,
            }}
        >
            {children}
        </GameClientContext.Provider>
    );
};
