import { PieceType, Player } from "game-engine";

import whitePawn from "../assets/pieces/white_pawn.png";
import whiteKnight from "../assets/pieces/white_knight.png";
import whiteBishop from "../assets/pieces/white_bishop.png";
import whiteRook from "../assets/pieces/white_rook.png";
import whiteQueen from "../assets/pieces/white_queen.png";
import whiteKing from "../assets/pieces/white_king.png";

import blackPawn from "../assets/pieces/black_pawn.png";
import blackKnight from "../assets/pieces/black_knight.png";
import blackBishop from "../assets/pieces/black_bishop.png";
import blackRook from "../assets/pieces/black_rook.png";
import blackQueen from "../assets/pieces/black_queen.png";
import blackKing from "../assets/pieces/black_king.png";
import styled from "styled-components";

interface PieceProps {
    pieceType: PieceType;
    color: Player;
}

const PieceImg = styled.img`
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
`;

export const Piece = ({ pieceType, color }: PieceProps) => {
    const mapVariablesToImage = {
        [Player.WHITE]: {
            [PieceType.PAWN]: whitePawn,
            [PieceType.KNIGHT]: whiteKnight,
            [PieceType.BISHOP]: whiteBishop,
            [PieceType.ROOK]: whiteRook,
            [PieceType.QUEEN]: whiteQueen,
            [PieceType.KING]: whiteKing,
        },
        [Player.BLACK]: {
            [PieceType.PAWN]: blackPawn,
            [PieceType.KNIGHT]: blackKnight,
            [PieceType.BISHOP]: blackBishop,
            [PieceType.ROOK]: blackRook,
            [PieceType.QUEEN]: blackQueen,
            [PieceType.KING]: blackKing,
        },
    };

    return (
        <PieceImg
            draggable={false}
            src={mapVariablesToImage[color][pieceType]}
            alt={`${color.toLowerCase()} ${pieceType}`}
        ></PieceImg>
    );
};
