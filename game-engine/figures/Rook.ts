import { FigureBase } from "./FigureBase";
import { FigureType } from "./FigureType";
import { Castleable } from "./Castleable";

export interface Rook extends FigureBase, Castleable {
    type: FigureType.ROOK;
}
