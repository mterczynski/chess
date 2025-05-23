import { ChessFile } from "./ChessFile";

export function addToFile(
    file: ChessFile,
    filesToAdd: number
): ChessFile | null {
    if (!Number.isInteger(filesToAdd)) {
        throw new Error("filesToAdd must be an integer");
    }

    const newFile = String.fromCharCode(file.charCodeAt(0) + filesToAdd);

    if (Object.values<string>(ChessFile).includes(newFile)) {
        return newFile as ChessFile;
    } else {
        return null; // TODO - consider if throw error instead makes more sense
    }
}
