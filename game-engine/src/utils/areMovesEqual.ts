import { Move } from "../Moves";

export function areMovesEqual(a: Move, b: Move): boolean {
    return (
        a.from.file === b.from.file &&
        a.from.rank === b.from.rank &&
        a.to.file === b.to.file &&
        a.to.rank === b.to.rank
    );
}
