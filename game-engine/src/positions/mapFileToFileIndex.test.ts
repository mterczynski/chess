import { ChessFile } from "./ChessFile";
import { mapFileToFileIndex } from "./mapFileToFileIndex";

describe("mapFileToFileIndex", () => {
    it("returns 0 when provided with A", () => {
        expect(mapFileToFileIndex(ChessFile.A)).toEqual(0);
    });

    it("returns 1 when provided with B", () => {
        expect(mapFileToFileIndex(ChessFile.B)).toEqual(1);
    });

    it("returns 2 when provided with C", () => {
        expect(mapFileToFileIndex(ChessFile.C)).toEqual(2);
    });

    it("returns 3 when provided with D", () => {
        expect(mapFileToFileIndex(ChessFile.D)).toEqual(3);
    });

    it("returns 4 when provided with E", () => {
        expect(mapFileToFileIndex(ChessFile.E)).toEqual(4);
    });

    it("returns 5 when provided with F", () => {
        expect(mapFileToFileIndex(ChessFile.F)).toEqual(5);
    });

    it("returns 6 when provided with G", () => {
        expect(mapFileToFileIndex(ChessFile.G)).toEqual(6);
    });

    it("returns 7 when provided with H", () => {
        expect(mapFileToFileIndex(ChessFile.H)).toEqual(7);
    });
});
