import { PieceType, Player } from "game-engine";
import styled from "styled-components";
import { GameClientContext } from "../GameClientContext";
import { useContext } from "react";

interface PieceProps {
    pieceType: PieceType;
    color: Player;
}

const PieceImg = styled.img<{ useBlackPerspective: boolean }>`
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    transform: ${({ useBlackPerspective }) =>
        useBlackPerspective ? "translate(50%, 50%)" : "translate(-50%, -50%)"};
    ${({ useBlackPerspective }) => useBlackPerspective && "rotate: 180deg;"}

    width: 80%;
    height: 80%;
`;

export const Piece = ({ pieceType, color }: PieceProps) => {
    const gameClientContext = useContext(GameClientContext);

    const mapVariablesToImage = {
        [Player.WHITE]: {
            [PieceType.PAWN]: "./assets/pieces/white_pawn.png",
            [PieceType.KNIGHT]: "./assets/pieces/white_knight.png",
            [PieceType.BISHOP]: "./assets/pieces/white_bishop.png",
            [PieceType.ROOK]: "./assets/pieces/white_rook.png",
            [PieceType.QUEEN]: "./assets/pieces/white_queen.png",
            [PieceType.KING]: "./assets/pieces/white_king.png",
        },
        [Player.BLACK]: {
            [PieceType.PAWN]: "./assets/pieces/black_pawn.png",
            [PieceType.KNIGHT]: "./assets/pieces/black_knight.png",
            [PieceType.BISHOP]: "./assets/pieces/black_bishop.png",
            [PieceType.ROOK]: "./assets/pieces/black_rook.png",
            [PieceType.QUEEN]: "./assets/pieces/black_queen.png",
            [PieceType.KING]: "./assets/pieces/black_king.png",
        },
    };

    return (
        <PieceImg
            draggable={false}
            src={mapVariablesToImage[color][pieceType]}
            alt={`${color.toLowerCase()} ${pieceType}`}
            useBlackPerspective={
                gameClientContext.playerSelection === Player.BLACK
            }
        ></PieceImg>
    );
};
