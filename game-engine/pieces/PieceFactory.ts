import { Bishop, Knight, Queen } from ".";
import { isCastleablePieceType } from "../castling";
import { Player } from "../Player";
import { King } from "./King";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { PieceType } from "./PieceType";
import { Rook } from "./Rook";

export function createPiece(type: PieceType, player: Player): Piece {
    if (isCastleablePieceType(type)) {
        return { type, player, hasMoved: false };
    } else {
        return { type, player };
    }
}

export function createPawn(player: Player): Pawn {
    return { type: PieceType.PAWN, player }
}

export function createKnight(player: Player): Knight {
    return { type: PieceType.KNIGHT, player }
}

export function createBishop(player: Player): Bishop {
    return { type: PieceType.BISHOP, player }
}

export function createRook(player: Player, hasMoved = false): Rook {
    return { type: PieceType.ROOK, player, hasMoved }
}

export function createQueen(player: Player): Queen {
    return { type: PieceType.QUEEN, player };
}

export function createKing(player: Player, hasMoved = false): King {
    return { type: PieceType.KING, player, hasMoved }
}
