import { Game } from "../Game";
import { Rank } from "./Rank";

export const mapRankIndexToRank = (index: number): Rank => {
    if (index < 0 || index > Game.boardSize - 1) {
        throw new Error("Invalid index");
    }

    return (index + 1) as Rank;
};
