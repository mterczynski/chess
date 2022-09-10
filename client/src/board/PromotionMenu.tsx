import { PieceType, PromotablePieceType, SpecialMoveType } from "game-engine";
import {
    mapFileToFileIndex,
    mapIndexToChessFile,
    mapRankIndexToRank,
    Position,
} from "game-engine/positions";
import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../GameContext";
import { tileSizeInPx } from "../tileSizeInPx";
import { BoardContext } from "./BoardContext";
import { borderStyle } from "./border-style";
import { Piece } from "./Piece";
import { playerSide } from "./playerSide";

const PromotionMenuContainer = styled.div<{ position: Position }>`
    position: absolute;
    left: ${({ position }) =>
        mapFileToFileIndex(position.file) * (tileSizeInPx + 2)}px;
    display: flex;
    flex-direction: column;
`;

const PieceSquare = styled.div`
    position: relative;
    width: ${tileSizeInPx}px;
    height: ${tileSizeInPx}px;
    background: #ffffff;
    border-bottom: ${borderStyle};
    border-left: ${borderStyle};
    background: #d0bf04c1;
    cursor: pointer;

    :first-child {
        border-top: ${borderStyle};
    }
`;

export const PromotionMenu = () => {
    const boardContext = useContext(BoardContext);
    const gameContext = useContext(GameContext);

    const onClick = (pieceType: PromotablePieceType) => {
        gameContext.move({
            from: {
                file: mapIndexToChessFile(
                    boardContext.selectedPiece!.fileIndex
                ),
                rank: mapRankIndexToRank(boardContext.selectedPiece!.tileIndex),
            },
            to: boardContext.promotionMenuPosition!,
            type: SpecialMoveType.PROMOTION,
            promoteTo: pieceType,
        });

        boardContext.setPromotionMenuPosition(null);
    };

    if (boardContext.promotionMenuPosition) {
        return (
            <PromotionMenuContainer
                position={boardContext.promotionMenuPosition}
            >
                <PieceSquare onClick={() => onClick(PieceType.KNIGHT)}>
                    <Piece
                        color={playerSide}
                        pieceType={PieceType.KNIGHT}
                    ></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.BISHOP)}>
                    <Piece
                        color={playerSide}
                        pieceType={PieceType.BISHOP}
                    ></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.ROOK)}>
                    <Piece
                        color={playerSide}
                        pieceType={PieceType.ROOK}
                    ></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.QUEEN)}>
                    <Piece
                        color={playerSide}
                        pieceType={PieceType.QUEEN}
                    ></Piece>
                </PieceSquare>
            </PromotionMenuContainer>
        );
    } else {
        return <></>;
    }
};
