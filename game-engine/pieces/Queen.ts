import { PieceBase } from "./PieceBase";
import { PieceType } from "./PieceType";

export interface Queen extends PieceBase {
    type: PieceType.QUEEN;
}
