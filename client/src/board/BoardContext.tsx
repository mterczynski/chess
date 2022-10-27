import { Move } from "game-engine";
import {
    mapIndexToChessFile,
    mapRankIndexToRank,
    Position,
} from "game-engine/positions";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { GameEngineContext } from "../GameEngineContext";
import { playerSide } from "./playerSide";

interface SelectedPiece {
    fileIndex: number;
    tileIndex: number;
}

/** Context responsible for handling board specific events & data */
export const BoardContext = React.createContext<{
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
}>({} as any);

export const BoardContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const gameEngineContext = useContext(GameEngineContext);
    const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(
        null
    );
    const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
    const [promotionMenuPosition, setPromotionMenuPosition] =
        useState<Position | null>(null); // stores null or promoting position

    // update available moves after selecting a piece
    useEffect(() => {
        if (!selectedPiece) {
            setAvailableMoves([]);
            return;
        }

        const availableSelectedPieceMoves =
            gameEngineContext.availableMovesForPlayer.filter(
                (move) =>
                    move.from.file ===
                        mapIndexToChessFile(selectedPiece.fileIndex) &&
                    move.from.rank ===
                        mapRankIndexToRank(selectedPiece.tileIndex)
            );
        setAvailableMoves(availableSelectedPieceMoves);
    }, [selectedPiece, gameEngineContext]);

    // make a random enemy move 500ms after player move
    useEffect(() => {
        if (
            gameEngineContext.currentPlayer !== null &&
            gameEngineContext.currentPlayer !== playerSide
        ) {
            setTimeout(() => {
                const randomMove = _.sample(
                    gameEngineContext.availableMovesForPlayer
                ) as Move;
                gameEngineContext.move(randomMove);
            }, 500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameEngineContext.currentPlayer]);

    return (
        <BoardContext.Provider
            value={{
                selectedPiece,
                setSelectedPiece,
                availableMoves,
                setAvailableMoves,
                promotionMenuPosition,
                setPromotionMenuPosition,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
