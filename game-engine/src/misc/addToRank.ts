import { Game } from "../Game";
import { Rank } from "../positions";

export function addToRank(currentRank: Rank, ranksToAdd: number): Rank | null {
    if(!Number.isInteger(ranksToAdd)) {
        throw new Error('ranksToAdd must be an integer');
    }

    const newRank = currentRank + ranksToAdd;

    if(newRank >= 1 && newRank <= Game.boardSize) {
        return newRank as Rank;
    } else {
        return null;
    }
}
