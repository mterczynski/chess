import { GameState } from "game-engine";
import { useContext, useEffect, useRef } from "react";
import { GameClientContext } from "../contexts/GameClientContext";
import { GameEngineContext } from "../contexts/GameEngineContext";
import { GameMode } from "../GameMode";
import { GeminiSettingsContext } from "./GeminiSettingsContext";
import { requestGeminiMove } from "./requestGeminiMove";

/**
 * Headless component that plays Gemini's moves. On every Gemini turn it reads
 * the current settings, sends the board state and the player's last move to
 * the Gemini API and applies the returned move.
 */
export const GeminiOpponent = () => {
    const { apiKey, elo, model } = useContext(GeminiSettingsContext);
    const { gameMode, playerSelection } = useContext(GameClientContext);
    const {
        availableMovesForPlayer,
        board,
        currentPlayer,
        move,
        moveHistory,
        state,
        undoLastMove,
    } = useContext(GameEngineContext);

    const requestInProgressRef = useRef(false);
    // Latest game info, so a resolved request can detect it became stale
    // (e.g. the game was restarted while waiting for Gemini)
    const latestTurnRef = useRef({ gameMode, currentPlayer, moveCount: 0 });
    latestTurnRef.current = {
        gameMode,
        currentPlayer,
        moveCount: moveHistory.length,
    };
    // Move count for which the missing-API-key alert was already shown,
    // to avoid duplicated alerts from double-invoked effects
    const noApiKeyAlertMoveCountRef = useRef<number | null>(null);

    useEffect(() => {
        const isGeminiTurn =
            gameMode === GameMode.VS_GEMINI &&
            playerSelection !== null &&
            currentPlayer !== null &&
            currentPlayer !== playerSelection &&
            (state === GameState.UNSTARTED ||
                state === GameState.IN_PROGRESS);

        if (!isGeminiTurn) {
            noApiKeyAlertMoveCountRef.current = null;
            return;
        }

        if (!apiKey) {
            if (noApiKeyAlertMoveCountRef.current !== moveHistory.length) {
                noApiKeyAlertMoveCountRef.current = moveHistory.length;
                window.alert(
                    "A Gemini API Key is required to play vs Gemini. " +
                        "Please insert your API Key in the Gemini settings panel.",
                );
                if (moveHistory.length > 0) {
                    undoLastMove();
                }
            }
            return;
        }

        if (requestInProgressRef.current) {
            return;
        }
        requestInProgressRef.current = true;

        const requestedAtMoveCount = moveHistory.length;
        const geminiPlayer = currentPlayer;

        requestGeminiMove({
            apiKey,
            model,
            elo,
            board,
            player: geminiPlayer,
            lastMove: moveHistory[moveHistory.length - 1] ?? null,
            availableMoves: availableMovesForPlayer,
        })
            .then((geminiMove) => {
                const latest = latestTurnRef.current;
                const isStale =
                    latest.gameMode !== GameMode.VS_GEMINI ||
                    latest.currentPlayer !== geminiPlayer ||
                    latest.moveCount !== requestedAtMoveCount;

                if (!isStale) {
                    move(geminiMove);
                }
            })
            .catch((error) => {
                window.alert(
                    `Gemini could not make a move: ${error.message}` +
                        (requestedAtMoveCount > 0
                            ? "\nYour last move has been undone - please try again."
                            : ""),
                );
                const latest = latestTurnRef.current;
                if (
                    requestedAtMoveCount > 0 &&
                    latest.gameMode === GameMode.VS_GEMINI &&
                    latest.currentPlayer === geminiPlayer &&
                    latest.moveCount === requestedAtMoveCount
                ) {
                    undoLastMove();
                }
            })
            .finally(() => {
                requestInProgressRef.current = false;
            });
    }, [
        gameMode,
        playerSelection,
        currentPlayer,
        state,
        apiKey,
        model,
        elo,
        board,
        moveHistory,
        availableMovesForPlayer,
        move,
        undoLastMove,
    ]);

    return null;
};
