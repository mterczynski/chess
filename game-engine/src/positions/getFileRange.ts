import { addToFile } from "./addToFile";
import { ChessFile } from "./ChessFile";

/** @param `inclusive` - informs whether from and to should be included in returned file range */
export const getFileRange = (from: ChessFile, to: ChessFile, { inclusive = true } = {}): ChessFile[] => {
    if (from === to) {
        if (inclusive) {
            return [from];
        } else {
            return [];
        }
    }

    const smallerFile = from.localeCompare(to) === -1 ? from : to;
    const biggerFile = from.localeCompare(to) === -1 ? to : from;
    const files: ChessFile[] = [];

    let currentFile: ChessFile | null = smallerFile;

    while (currentFile && currentFile !== biggerFile) {
        files.push(currentFile);
        currentFile = addToFile(currentFile, 1);
    }

    files.push(biggerFile);

    if (!inclusive) {
        return files
            .filter(file => file !== from)
            .filter(file => file !== to);
    }

    return files;
}
