import { Castleable } from "./Castleable";
import { PieceBase } from "./PieceBase";
import { PieceType } from "./PieceType";

export interface King extends PieceBase, Castleable {
    type: PieceType.KING;
}
