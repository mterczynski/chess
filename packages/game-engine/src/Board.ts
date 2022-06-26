import { Piece } from "./pieces";
import { ChessFile } from "./positions";

export type Board = {
    [File in ChessFile]: (Piece | null)[];
};
