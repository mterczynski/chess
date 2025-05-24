import {
    arePositionsEqual,
    Game,
    mapIndexToChessFile,
    mapRankIndexToRank,
    Piece,
    SpecialMoveType,
} from "game-engine";
import { Piece as PieceComponent } from "./Piece";
import styled from "styled-components";
import { useCallback, useContext } from "react";
import { GameClientContext } from "../GameClientContext";
import { GameEngineContext } from "../GameEngineContext";
import { AvailableMoveDestination } from "./AvailableMoveDestination";
import { settings } from "../settings";
import { GameMode } from "../GameMode";

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
            gameClientContext.gameMode === GameMode.VS_BOT &&
            gameEngineContext.currentPlayer !==
                gameClientContext.playerSelection
        ) {
            return;
        }

        const isEmptyTile = piece === null;
        const isOwnPieceSelected =
            !isEmptyTile &&
            ((gameClientContext.gameMode === GameMode.VS_BOT &&
                piece.player === gameClientContext.playerSelection) ||
                (gameClientContext.gameMode === GameMode.VS_PLAYER_OFFLINE &&
                    piece.player === gameEngineContext.currentPlayer));
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
                // Always clear and update selected piece before moving
                gameClientContext.setSelectedPiece(null); // Deselect to prevent stale selection
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
