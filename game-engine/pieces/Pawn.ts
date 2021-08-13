import { PieceBase } from "./PieceBase";
import { PieceType } from "./PieceType";

export interface Pawn extends PieceBase {
    type: PieceType.PAWN;
}
