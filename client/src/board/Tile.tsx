import { arePositionsEqual, mapIndexToChessFile, mapRankIndexToRank, Piece, SpecialMoveType } from "game-engine";
import { Piece as PieceComponent } from "./Piece";
import styled from "styled-components";
import { useCallback, useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { GameEngineContext } from "../GameEngineContext";
import { AvailableMoveDestination } from "./AvailableMoveDestination";
import { settings } from "../settings";

const TileBackground = styled.div<{ color: string }>`
    position: relative;
    background: ${({ color }) => color};
    border-top: ${settings.borderStyle};
    border-right: ${settings.borderStyle};

    width: 100%;
    height: 100%;

    :first-child {
        border-bottom: ${settings.borderStyle};
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
