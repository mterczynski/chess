import { Piece } from "./pieces/Piece";
import { ChessFile } from "./positions";

export type Board = {
    [File in ChessFile]: (Piece | null)[];
};
