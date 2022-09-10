import { Piece, SpecialMoveType } from "game-engine";
import { Piece as PieceComponent } from "./Piece";
import styled from "styled-components";
import { borderStyle } from "./border-style";
import { useCallback, useContext } from "react";
import { BoardContext } from "./BoardContext";
import { GameContext } from "../GameContext";
import { playerSide } from "./playerSide";
import {
    arePositionsEqual,
    mapIndexToChessFile,
    mapRankIndexToRank,
} from "game-engine/positions";
import { AvailableMoveDestination } from "./AvailableMoveDestination";
import { tileSizeInPx } from "../tileSizeInPx";

const TileBackground = styled.div<{ color: string }>`
    position: relative;
    background: ${({ color }) => color};
    border-top: ${borderStyle};
    border-right: ${borderStyle};
    width: ${tileSizeInPx}px;
    height: ${tileSizeInPx}px;

    :first-child {
        border-bottom: ${borderStyle};
    }
`;

interface TileProps {
    tileColor: string;
    piece: Piece | null;
    fileIndex: number;
    tileIndex: number;
}

export const Tile = ({ piece, tileColor, fileIndex, tileIndex }: TileProps) => {
    const boardContext = useContext(BoardContext);
    const gameContext = useContext(GameContext);

    const isAvailableMoveDestinationPosition = boardContext.availableMoves.find(
        (move) =>
            arePositionsEqual(move.to, {
                file: mapIndexToChessFile(fileIndex),
                rank: mapRankIndexToRank(tileIndex),
            })
    );

    const onClick = useCallback(() => {
        if (gameContext.currentPlayer !== playerSide) {
            return;
        }

        const isEmptyTile = piece === null;
        const isOwnPieceSelected = !isEmptyTile && piece.player === playerSide;
        const availableMoveToSelectedTile = boardContext.availableMoves.find(
            (move) =>
                arePositionsEqual(move.to, {
                    file: mapIndexToChessFile(fileIndex),
                    rank: mapRankIndexToRank(tileIndex),
                })
        );

        // TODO - allow promotions
        if (availableMoveToSelectedTile) {
            if (
                (availableMoveToSelectedTile as any).type ===
                SpecialMoveType.PROMOTION
            ) {
                boardContext.setPromotionMenuPosition(
                    availableMoveToSelectedTile.to
                );
            } else {
                gameContext.move(availableMoveToSelectedTile);
            }
        } else if (isOwnPieceSelected) {
            boardContext.setSelectedPiece({ fileIndex, tileIndex });
        }
    }, [boardContext, fileIndex, gameContext, piece, tileIndex]);

    return (
        <TileBackground color={tileColor} onClick={onClick}>
            {piece && (
                <PieceComponent
                    pieceType={piece.type}
                    color={piece.player}
                ></PieceComponent>
            )}

            {isAvailableMoveDestinationPosition && <AvailableMoveDestination />}
        </TileBackground>
    );
};
