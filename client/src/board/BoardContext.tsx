import { Move } from "game-engine";
import { mapIndexToChessFile, mapRankIndexToRank } from "game-engine/positions";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../GameContext";

interface SelectedPiece {
    fileIndex: number;
    tileIndex: number;
}

export const BoardContext = React.createContext<{
    selectedPiece: SelectedPiece | null;
    setSelectedPiece: React.Dispatch<
        React.SetStateAction<SelectedPiece | null>
    >;
    availableMoves: Move[];
    setAvailableMoves: React.Dispatch<React.SetStateAction<Move[]>>;
}>({} as any);

export const BoardContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const gameContext = useContext(GameContext);
    const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(
        null
    );
    const [availableMoves, setAvailableMoves] = useState<Move[]>([]);

    // update available moves after selecting a piece
    useEffect(() => {
        if (!selectedPiece) {
            setAvailableMoves([]);
            return;
        }

        const availablePlayerMoves = gameContext.getAvailableMovesForPlayer();
        const availableSelectedPieceMoves = availablePlayerMoves.filter(
            (move) =>
                move.from.file ===
                    mapIndexToChessFile(selectedPiece.fileIndex) &&
                move.from.rank === mapRankIndexToRank(selectedPiece.tileIndex)
        );
        setAvailableMoves(availableSelectedPieceMoves);
    }, [selectedPiece, gameContext]);

    return (
        <BoardContext.Provider
            value={{
                selectedPiece,
                setSelectedPiece,
                availableMoves,
                setAvailableMoves,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
