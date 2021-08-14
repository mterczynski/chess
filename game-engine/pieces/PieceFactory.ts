import { isCastleablePieceType } from "../castling";
import { Player } from "../Player";
import { Piece } from "./Piece";
import { PieceType } from "./PieceType";

export class PieceFactory {
    createPiece(type: PieceType, player: Player): Piece {
        if(isCastleablePieceType(type)) {
            return {type, player, hasMoved: false};
        } else {
            return {type, player};
        }
    }
}
