import { Player } from "../Player";
import { Position } from "../positions";
import { PieceType } from "./PieceType";

export interface PieceBase {
    type: PieceType,
    player: Player,
    position: Position
}
