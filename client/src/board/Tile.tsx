import { Piece, SpecialMoveType } from "game-engine";
import { Piece as PieceComponent } from "./Piece";
import styled from "styled-components";
import { borderStyle } from "./border-style";
import { useCallback, useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { GameEngineContext } from "../GameEngineContext";
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
    const gameClientContext = useContext(GameClientContext);
    const gameEngineContext = useContext(GameEngineContext);

    const isAvailableMoveDestinationPosition =
        gameClientContext.availableMoves.find((move) =>
            arePositionsEqual(move.to, {
                file: mapIndexToChessFile(fileIndex),
                rank: mapRankIndexToRank(tileIndex),
            })
        );

    const onClick = useCallback(() => {
        if (
            gameEngineContext.currentPlayer !==
            gameClientContext.playerSelection
        ) {
            return;
        }

        const isEmptyTile = piece === null;
        const isOwnPieceSelected =
            !isEmptyTile && piece.player === gameClientContext.playerSelection;
        const availableMoveToSelectedTile =
            gameClientContext.availableMoves.find((move) =>
                arePositionsEqual(move.to, {
                    file: mapIndexToChessFile(fileIndex),
                    rank: mapRankIndexToRank(tileIndex),
                })
            );

        if (availableMoveToSelectedTile) {
            if (
                (availableMoveToSelectedTile as any).type ===
                SpecialMoveType.PROMOTION
            ) {
                gameClientContext.setPromotionMenuPosition(
                    availableMoveToSelectedTile.to
                );
            } else {
                gameEngineContext.move(availableMoveToSelectedTile);
            }
        } else if (isOwnPieceSelected) {
            gameClientContext.setSelectedPiece({ fileIndex, tileIndex });
        }
    }, [gameClientContext, fileIndex, gameEngineContext, piece, tileIndex]);

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
