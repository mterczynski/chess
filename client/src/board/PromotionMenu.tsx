import {
    PieceType,
    PromotablePieceType,
    SpecialMoveType,
    mapFileToFileIndex,
    mapIndexToChessFile,
    mapRankIndexToRank,
    Position,
} from "game-engine";
import { useContext } from "react";
import styled from "styled-components";
import { GameClientContext } from "../contexts/GameClientContext";
import { Piece } from "./Piece";
import { GameEngineContext } from "../contexts/GameEngineContext";
import { settings } from "../settings";

const PromotionMenuContainer = styled.div<{ position: Position }>`
    position: absolute;
    left: ${({ position }) =>
        mapFileToFileIndex(position.file) * (settings.tileSizeInPx + 2)}px;
    display: flex;
    flex-direction: column;
`;

const PieceSquare = styled.div`
    position: relative;
    width: ${settings.tileSizeInPx}px;
    height: ${settings.tileSizeInPx}px;
    border-bottom: ${settings.borderStyle};
    border-left: ${settings.borderStyle};
    background: #d0bf04c1;
    cursor: pointer;

    :first-child {
        border-top: ${settings.borderStyle};
    }
`;

export const PromotionMenu = () => {
    const gameEngineContext = useContext(GameEngineContext);
    const gameClientContext = useContext(GameClientContext);
    const player = gameEngineContext.currentPlayer;

    const onClick = (pieceType: PromotablePieceType) => {
        gameEngineContext.move({
            from: {
                file: mapIndexToChessFile(
                    gameClientContext.selectedPiece!.fileIndex,
                ),
                rank: mapRankIndexToRank(
                    gameClientContext.selectedPiece!.tileIndex,
                ),
            },
            to: gameClientContext.promotionMenuPosition!,
            type: SpecialMoveType.PROMOTION,
            promoteTo: pieceType,
        });

        gameClientContext.setPromotionMenuPosition(null);
    };

    if (gameClientContext.promotionMenuPosition) {
        if (!player) {
            throw new Error("Player is not selected for promotion menu");
        }

        return (
            <PromotionMenuContainer
                position={gameClientContext.promotionMenuPosition}
            >
                <PieceSquare onClick={() => onClick(PieceType.KNIGHT)}>
                    <Piece color={player} pieceType={PieceType.KNIGHT}></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.BISHOP)}>
                    <Piece color={player} pieceType={PieceType.BISHOP}></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.ROOK)}>
                    <Piece color={player} pieceType={PieceType.ROOK}></Piece>
                </PieceSquare>

                <PieceSquare onClick={() => onClick(PieceType.QUEEN)}>
                    <Piece color={player} pieceType={PieceType.QUEEN}></Piece>
                </PieceSquare>
            </PromotionMenuContainer>
        );
    } else {
        return <></>;
    }
};
