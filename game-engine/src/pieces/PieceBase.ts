import { Player } from "../Player";
import { PieceType } from "./PieceType";

export interface PieceBase {
    type: PieceType,
    player: Player,
}
