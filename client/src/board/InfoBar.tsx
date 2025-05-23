import styled from "styled-components";
import { useContext, useMemo, useRef } from "react";
import { GameEngineContext } from "../GameEngineContext";
import { GameClientContext } from "../GameClientContext";
import { Player, GameState } from "game-engine";
import { openings } from "game-engine/src/openings/openings";
import { areMovesEqual } from "game-engine/src/utils";

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
    transition: background 0.2s, border 0.2s;
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
    } = useContext(GameClientContext);

    // Track last matched opening across renders
    const lastOpeningRef = useRef<string | null>(null);

    // Find current opening using move history
    const currentOpening = useMemo(() => {
        if (!moveHistory || moveHistory.length === 0) return null; // Prevent matching on empty board
        const matchingOpenings = openings.filter(
            (opening) =>
                moveHistory.length >= opening.moves.length &&
                opening.moves.every((move, index) =>
                    areMovesEqual(move, moveHistory[index])
                )
        );

        return (
            matchingOpenings.sort((a, b) => {
                return a.moves.length - b.moves.length;
            })[0]?.name || null
        );
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
    } else if (
        state === GameState.DRAW_BY_STALEMATE ||
        state === GameState.DRAW_BY_INSUFFICIENT_MATERIAL ||
        state === GameState.DRAW_BY_REPETITION ||
        state === GameState.DRAW_BY_50_MOVE_RULE ||
        state === GameState.DRAW_BY_75_MOVE_RULE ||
        state === GameState.DRAW_BY_AGREEMENT
    ) {
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
