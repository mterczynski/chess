import { Castleable } from "./Castleable";
import { FigureBase } from "./FigureBase";
import { FigureType } from "./FigureType";

export interface King extends FigureBase, Castleable {
    type: FigureType.KING;
}
