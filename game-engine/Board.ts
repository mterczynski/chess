import { Figure } from "./figures/Figure";
import { ChessFile } from "./positions";

export type Board = {
    [File in ChessFile]: (Figure | null)[];
};
