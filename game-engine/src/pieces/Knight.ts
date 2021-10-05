import { PieceBase } from "./PieceBase";
import { PieceType } from "./PieceType";

export interface Knight extends PieceBase {
    type: PieceType.KNIGHT;
}
