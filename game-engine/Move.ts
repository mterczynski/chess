import { PieceType } from "./pieces";
import { Position } from "./positions";

export interface Move {
    from: Position,
    to: Position,
}
