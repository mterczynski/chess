import { Position } from "../positions";

export function arePositionsEqual(position1: Position, position2: Position): boolean {
    return position1.file === position2.file && position1.rank === position2.rank;
}
