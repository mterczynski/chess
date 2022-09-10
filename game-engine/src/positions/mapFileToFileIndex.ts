import { ChessFile } from "./ChessFile";

export function mapFileToFileIndex(file: ChessFile) {
    return file.charCodeAt(0) - "A".charCodeAt(0);
}
