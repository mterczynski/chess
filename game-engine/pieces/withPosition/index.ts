import { Piece } from "..";
import { Position } from "../../positions";

export type PieceWithPosition = Piece & {position: Position};
