import { PieceType, PromotablePieceType, SpecialMoveType } from "game-engine";
import {
    mapFileToFileIndex,
    mapIndexToChessFile,
    mapRankIndexToRank,
    Position,
} from "game-engine/positions";
import { useContext } from "react";
import styled from "styled-components";
import { tileSizeInPx } from "../tileSizeInPx";
import { GameClientContext } from "../GameClientContext";
import { borderStyle } from "./border-style";
import { Piece } from "./Piece";
import { GameEngineContext } from "../GameEngineContext";

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
    const gameEngineContext = useContext(GameEngineContext);
    const gameClientContext = useContext(GameClientContext);

    const onClick = (pieceType: PromotablePieceType) => {
        gameEngineContext.move({
            from: {
                file: mapIndexToChessFile(
                    gameClientContext.selectedPiece!.fileIndex
                ),
                rank: mapRankIndexToRank(
                    gameClientContext.selectedPiece!.tileIndex
                ),
            },
            to: gameClientContext.promotionMenuPosition!,
            type: SpecialMoveType.PROMOTION,
            promoteTo: pieceType,
        });

        gameClientContext.setPromotionMenuPosition(null);
    };

    if (gameClientContext.promotionMenuPosition) {
        return (
            <PromotionMenuContainer
                position={gameClientContext.promotionMenuPosition}
            >
                <PieceSquare onClick={() => onClick(PieceType.KNIGHT)}>
                    <Piece
                        color={gameClientContext.playerSelection!}
                        pieceType={PieceType.KNIGHT}
                    ></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.BISHOP)}>
                    <Piece
                        color={gameClientContext.playerSelection!}
                        pieceType={PieceType.BISHOP}
                    ></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.ROOK)}>
                    <Piece
                        color={gameClientContext.playerSelection!}
                        pieceType={PieceType.ROOK}
                    ></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.QUEEN)}>
                    <Piece
                        color={gameClientContext.playerSelection!}
                        pieceType={PieceType.QUEEN}
                    ></Piece>
                </PieceSquare>
            </PromotionMenuContainer>
        );
    } else {
        return <></>;
    }
};
