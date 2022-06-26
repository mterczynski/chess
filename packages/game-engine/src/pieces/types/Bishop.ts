import { PieceBase } from "./PieceBase";
import { PieceType } from "./PieceType";

export interface Bishop extends PieceBase {
    type: PieceType.BISHOP;
}
