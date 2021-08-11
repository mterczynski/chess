import { ChessFile } from "./ChessFile";
import { Rank } from "./Rank";


export interface Position {
    file: ChessFile;
    row: Rank;
}