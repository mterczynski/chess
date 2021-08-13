import { FigureBase } from "./FigureBase";
import { FigureType } from "./FigureType";

export interface Pawn extends FigureBase {
    type: FigureType.PAWN;
}
