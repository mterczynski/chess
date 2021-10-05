import { Piece } from "../index";
import { Position } from "../../positions";

export type PieceWithPosition = Piece & {position: Position};
