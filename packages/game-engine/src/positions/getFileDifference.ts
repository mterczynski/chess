import { ChessFile } from "./index";

export function getFileDifference(file1: ChessFile, file2: ChessFile): number {
    return file2.charCodeAt(0) - file1.charCodeAt(0);
}
