import styled from "styled-components";
import { useContext } from "react";
import { GameEngineContext } from "../GameEngineContext";
import { GameClientContext } from "../GameClientContext";
import { Player, GameState } from "game-engine";

const InfoBarWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* Add gap between InfoBar and board */
    gap: 15px;
`;

const InfoBarContainer = styled.div`
    width: 100%;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    letter-spacing: 0.5px;
    text-align: center;
    background: transparent;
    margin: 0;
    padding: 0.7em 0;
    margin-bottom: 15px;
`;

const RestartButton = styled.button`
  margin-top: 0;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  border: 2px solid #fff;
  background: #111;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, border 0.2s;
  width: auto;
  align-self: center;
  &:hover {
    background: #2d8cff;
    border: 2px solid #2d8cff;
  }
`;

export const InfoBar = () => {
    const { currentPlayer, state, restartGame } = useContext(GameEngineContext);
    const { setSelectedPiece, setAvailableMoves, setPromotionMenuPosition, selectPlayer, playerTurnTimeoutRef } = useContext(GameClientContext);

    let infoText = null;
    if (state === GameState.IN_PROGRESS || state === GameState.UNSTARTED) {
        if (currentPlayer === Player.WHITE) {
            infoText = "White's turn";
        } else if (currentPlayer === Player.BLACK) {
            infoText = "Black's turn";
        } else {
            infoText = "";
        }
    } else if (state === GameState.WHITE_WON) {
        infoText = "White wins!";
    } else if (state === GameState.BLACK_WON) {
        infoText = "Black wins!";
    } else if (
        state === GameState.DRAW_BY_STALEMATE ||
        state === GameState.DRAW_BY_INSUFFICIENT_MATERIAL ||
        state === GameState.DRAW_BY_REPETITION ||
        infoText = "Draw!";
    } else {
        infoText = "Game Over";
    }

    const handleRestart = () => {
        restartGame();
        selectPlayer(null);
        setSelectedPiece(null);
        setAvailableMoves([]);
        setPromotionMenuPosition(null);
        if (playerTurnTimeoutRef && playerTurnTimeoutRef.current) {
            clearTimeout(playerTurnTimeoutRef.current);
            playerTurnTimeoutRef.current = null;
        }
    };

    return (
      <InfoBarWrapper>
        <InfoBarContainer>{infoText}</InfoBarContainer>
        <RestartButton onClick={handleRestart}>Restart Game</RestartButton>
      </InfoBarWrapper>
    );
};
