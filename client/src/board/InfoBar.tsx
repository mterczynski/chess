import styled from "styled-components";
import { useContext } from "react";
import { GameEngineContext } from "../GameEngineContext";
import { Player, GameState } from "game-engine";

const InfoBarContainer = styled.div`
    width: 100%;
    max-width: 560px;
    margin: 0 auto 10px auto;
    padding: 0.7em 0;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    letter-spacing: 0.5px;
    top: 30px;
`;

export const InfoBar = () => {
    const { currentPlayer, state } = useContext(GameEngineContext);

    let infoText = null;
    if (!state || state === GameState.IN_PROGRESS || state === GameState.UNSTARTED) {
        if (currentPlayer === Player.WHITE) infoText = "White's turn";
        else if (currentPlayer === Player.BLACK) infoText = "Black's turn";
        else infoText = "";
    } else if (state === GameState.WHITE_WON) infoText = "White wins!";
    else if (state === GameState.BLACK_WON) infoText = "Black wins!";
    else if (
        state === GameState.DRAW_BY_STALEMATE ||
        state === GameState.DRAW_BY_INSUFFICIENT_MATERIAL ||
        state === GameState.DRAW_BY_REPETITION ||
        state === GameState.DRAW_BY_50_MOVE_RULE ||
        state === GameState.DRAW_BY_75_MOVE_RULE ||
        state === GameState.DRAW_BY_AGREEMENT
    ) infoText = "Draw!";
    else infoText = "Game Over";

    return <InfoBarContainer>{infoText}</InfoBarContainer>;
};
