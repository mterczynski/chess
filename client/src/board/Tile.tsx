import { Piece } from "game-engine";
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
    Rank,
} from "game-engine/positions";
import { AvailableMoveDestination } from "./AvailableMoveDestination";

const TileBackground = styled.div<{ color: string }>`
    position: relative;
    background: ${({ color }) => color};
    border-top: ${borderStyle};
    border-right: ${borderStyle};
    width: 70px;
    height: 70px;

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
        const avaiableMoveToSelectedTile = boardContext.availableMoves.find(
            (move) =>
                arePositionsEqual(move.to, {
                    file: mapIndexToChessFile(fileIndex),
                    rank: mapRankIndexToRank(tileIndex),
                })
        );

        if (isOwnPieceSelected) {
            // select unless castling
            // TODO - check for castling
            boardContext.setSelectedPiece({ fileIndex, tileIndex });
        } else if (avaiableMoveToSelectedTile && isEmptyTile) {
            gameContext.move(avaiableMoveToSelectedTile);
            // TODO - perform a move
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
