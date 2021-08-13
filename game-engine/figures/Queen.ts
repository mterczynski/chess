import { FigureBase } from "./FigureBase";
import { FigureType } from "./FigureType";

export interface Queen extends FigureBase {
    type: FigureType.QUEEN;
}
