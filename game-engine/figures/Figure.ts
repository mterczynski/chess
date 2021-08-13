import { Player } from "../Player";
import { Position } from "../positions";
import { FigureType } from "./FigureType";

export interface Figure {
    type: FigureType,
    player: Player,
    position: Position
}
