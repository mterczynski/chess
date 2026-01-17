import styled from "styled-components";
import { useContext, useMemo, useRef } from "react";
import { GameEngineContext } from "../contexts/GameEngineContext";
import { GameClientContext } from "../contexts/GameClientContext";
import { Player, GameState } from "game-engine";
import { isDraw } from "game-engine/src/utils";
import { findOpeningByMoves } from "game-engine/src/utils/findOpeningByMoves";

const InfoBarContainer = styled.div`
    width: 100%;
    max-width: 560px;
    margin: 0 auto 10px auto;
    padding: 0.7em 0;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    letter-spacing: 0.5px;
    top: 30px;
`;

const RestartButton = styled.button`
    margin-top: 10px;
    padding: 0.5em 1.2em;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 8px;
    border: 2px solid #fff;
    background: #111;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition:
        background 0.2s,
        border 0.2s;
    &:hover {
        background: #2d8cff;
        border: 2px solid #2d8cff;
    }
`;

export const InfoBar = () => {
    const { currentPlayer, state, restartGame, moveHistory } =
        useContext(GameEngineContext);
    const {
        setSelectedPiece,
        setAvailableMoves,
        setPromotionMenuPosition,
        selectPlayer,
        playerTurnTimeoutRef,
        setGameMode,
    } = useContext(GameClientContext);

    // Track last matched opening across renders
    const lastOpeningRef = useRef<string | null>(null);

    // Find current opening using move history
    const currentOpening = useMemo(() => {
        const opening = findOpeningByMoves(moveHistory);
        return opening?.name || null;
    }, [moveHistory]);

    // Persist last matched opening
    if (currentOpening) {
        lastOpeningRef.current = currentOpening;
    }

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
    } else if (isDraw(state)) {
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
        lastOpeningRef.current = null; // Reset opening on restart
        setGameMode(null); // Reset mode and go back to mode selection
    };

    return (
        <>
            <InfoBarContainer>
                {lastOpeningRef.current && (
                    <span
                        style={{
                            display: "block",
                            fontSize: "1rem",
                            fontWeight: 400,
                            color: "#b3e5fc",
                            marginBottom: "0.2em",
                        }}
                    >
                        Opening: {lastOpeningRef.current}
                    </span>
                )}
                {infoText}
            </InfoBarContainer>
            <div
                style={{
                    width: "100%",
                    maxWidth: 560,
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <RestartButton onClick={handleRestart}>
                    Restart Game
                </RestartButton>
            </div>
        </>
    );
};
