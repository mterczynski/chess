import { FigureBase } from "./FigureBase";
import { FigureType } from "./FigureType";

export interface Bishop extends FigureBase {
    type: FigureType.BISHOP;
}
