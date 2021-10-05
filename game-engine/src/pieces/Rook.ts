import { PieceBase } from "./PieceBase";
import { PieceType } from "./PieceType";
import { Castleable } from "./Castleable";

export interface Rook extends PieceBase, Castleable {
    type: PieceType.ROOK;
}
