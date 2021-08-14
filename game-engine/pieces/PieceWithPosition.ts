import { Position } from "../positions";
import { Piece } from "./Piece";

export type PieceWithPosition = Piece & {position: Position}
