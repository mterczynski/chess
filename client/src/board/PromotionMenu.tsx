import {
    PieceType,
    PromotablePieceType,
    SpecialMoveType,
    mapFileToFileIndex,
    mapIndexToChessFile,
    mapRankIndexToRank,
    Position,
    Player,
} from "game-engine";
import { useContext } from "react";
import styled from "styled-components";
import { GameClientContext } from "../contexts/GameClientContext";
import { Piece } from "./Piece";
import { GameEngineContext } from "../contexts/GameEngineContext";
import { settings } from "../settings";

const PromotionMenuContainer = styled.div<{ 
    position: Position; 
    useBlackPerspective: boolean 
}>`
    position: absolute;
    left: ${({ position, useBlackPerspective }) => {
        const fileIndex = mapFileToFileIndex(position.file);
        
        // Calculate position accounting for the actual border structure:
        // - First file (index 0) has border-left: 2px
        // - Each file has width: tileSizeInPx
        // - Each file except last has border-right: 2px
        // So file positions are: 2px, 2px + 70px + 2px, 2px + 70px + 2px + 70px + 2px, etc.
        let leftPosition;
        if (fileIndex === 0) {
            leftPosition = 2; // Just the left border
        } else {
            leftPosition = 2 + fileIndex * (settings.tileSizeInPx + 2);
        }
        
        // When board is rotated for black perspective, calculate from the right
        if (useBlackPerspective) {
            // Total board width = left border + (8 * tileSize) + (7 * right borders)
            const totalBoardWidth = 2 + (8 * settings.tileSizeInPx) + (7 * 2);
            return totalBoardWidth - leftPosition - settings.tileSizeInPx;
        }
        
        return leftPosition;
    }}px;
    top: ${({ position, useBlackPerspective }) => {
        const rankIndex = position.rank - 1; // ranks are 1-indexed, convert to 0-indexed
        
        // Each tile has height tileSizeInPx and border-top: 2px
        // The first tile (rank 8 in normal view, rank 1 in black view) has top border
        let topPosition;
        if (useBlackPerspective) {
            // In black perspective, rank 1 is at the top
            topPosition = 2 + rankIndex * settings.tileSizeInPx;
        } else {
            // In normal view, rank 8 is at the top (7 - rankIndex)
            topPosition = 2 + (7 - rankIndex) * settings.tileSizeInPx;
        }
        
        return topPosition;
    }}px;
    display: flex;
    flex-direction: ${({ useBlackPerspective }) => 
        useBlackPerspective ? 'column-reverse' : 'column'};
    z-index: 1000;
`;

const PieceSquare = styled.div`
    position: relative;
    width: ${settings.tileSizeInPx}px;
    height: ${settings.tileSizeInPx}px;
    border: ${settings.borderStyle};
    background: #d0bf04c1;
    cursor: pointer;
    box-sizing: border-box;
    
    /* Ensure consistent border styling */
    &:not(:last-child) {
        border-bottom: none;
    }
`;

export const PromotionMenu = () => {
    const gameEngineContext = useContext(GameEngineContext);
    const gameClientContext = useContext(GameClientContext);
    const player = gameEngineContext.currentPlayer;
    const useBlackPerspective = gameClientContext.playerSelection === Player.BLACK;

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
                useBlackPerspective={useBlackPerspective}
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
