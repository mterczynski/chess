import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Board } from "../board/Board";
import { WaitingText } from "./WaitingText";
import { settings } from "../settings";
import type { LobbyDetailsDto, LobbyUpdateDto } from "chess-shared";
import { Player } from "game-engine";
import { GameEngineContext } from "../contexts/GameEngineContext";
import { GameClientContext } from "../contexts/GameClientContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    width: 100%;
    min-height: 100vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-bottom: 1rem;
`;

const BackButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid #666;
    background: #fff;
    color: #333;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;

    &:hover {
        background: #f0f0f0;
    }
`;

const LobbyTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin: 0;
`;

const PlayersPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 800px;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(45, 140, 255, 0.1);
`;

const PlayerRow = styled.div<{ isCurrentUser?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.1rem;
    font-weight: ${(props) => (props.isCurrentUser ? "700" : "500")};
    color: ${(props) => (props.isCurrentUser ? "#2d8cff" : "#333")};
`;

const PlayerIcon = styled.span`
    font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    padding: 1rem;
    background: #ffe6e6;
    border-radius: 8px;
    margin-bottom: 1rem;
    max-width: 800px;
    width: 100%;
`;

const LoadingMessage = styled.div`
    color: #666;
    font-size: 1.1rem;
    padding: 2rem;
`;

interface LobbyRoomProps {
    lobbyId: number;
    password: string;
    onBack: () => void;
}

/**
 * LobbyRoom - Container for online game board with player context
 * Implements specifications from ONLINE_MULTIPLAYER_SPEC.md
 * - RULE-001: First joiner = White, Second joiner = Black
 * - RULE-004: Real-time updates via SSE
 * - RULE-006: Animated waiting state
 * - RULE-007: Player name display
 */
export const LobbyRoom: React.FC<LobbyRoomProps> = ({
    lobbyId,
    password,
    onBack,
}) => {
    const [lobbyDetails, setLobbyDetails] =
        useState<LobbyDetailsDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const gameEngineContext = useContext(GameEngineContext);
    const gameClientContext = useContext(GameClientContext);

    // Get current user's name from JWT
    const getCurrentUserName = (): string | null => {
        const token = localStorage.getItem(settings.localStorageKeys.jwt);
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.name;
        } catch {
            return null;
        }
    };

    const currentUserName = getCurrentUserName();

    // Initial fetch of lobby details
    useEffect(() => {
        const fetchLobby = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch(
                    `${settings.serverURL}/lobby/${lobbyId}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ password }),
                    },
                );

                if (!res.ok) {
                    if (res.status === 403) {
                        setError("Incorrect password");
                    } else if (res.status === 404) {
                        setError("Lobby not found");
                    } else {
                        setError("Failed to load lobby");
                    }
                    setIsLoading(false);
                    return;
                }

                const data: LobbyDetailsDto = await res.json();
                setLobbyDetails(data);
                
                // Sync game engine with server state
                if (data.board) {
                    gameEngineContext.setBoard(data.board);
                }
                
                setIsLoading(false);
            } catch (err) {
                setError("Network error. Please try again.");
                setIsLoading(false);
            }
        };

        fetchLobby();
    }, [lobbyId, password]);

    // SSE subscription for real-time updates
    useEffect(() => {
        if (!lobbyDetails) return;

        const eventSource = new EventSource(
            `${settings.serverURL}/lobby/${lobbyId}/game-updates`,
            {
                withCredentials: false,
            },
        );

        // Add password to headers (Note: EventSource doesn't support custom headers well)
        // We'll need to pass it via query param or validate on initial fetch
        // For now, relying on initial password validation

        eventSource.onmessage = (event) => {
            try {
                const update: LobbyUpdateDto = JSON.parse(event.data);
                setLobbyDetails(update.lobby);
                
                // Update game engine with new state
                if (update.lobby.board) {
                    gameEngineContext.setBoard(update.lobby.board);
                }
            } catch (err) {
                console.error("Failed to parse SSE message:", err);
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE connection error:", err);
            eventSource.close();
            // TODO: Implement reconnection logic (RULE-004)
        };

        return () => {
            eventSource.close();
        };
    }, [lobbyDetails, lobbyId]);

    // Handle making a move
    const handleMove = async (move: any) => {
        if (!lobbyDetails) return;

        try {
            const res = await fetch(
                `${settings.serverURL}/lobby/${lobbyId}/move`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ move, password }),
                },
            );

            if (!res.ok) {
                const data = await res.json();
                console.error("Move rejected:", data.message);
                return;
            }

            // Server will broadcast update via SSE, no need to update locally
        } catch (err) {
            console.error("Failed to send move:", err);
        }
    };

    if (isLoading) {
        return (
            <Container>
                <LoadingMessage>Loading lobby...</LoadingMessage>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorMessage>{error}</ErrorMessage>
                <BackButton onClick={onBack}>← Back to Lobby List</BackButton>
            </Container>
        );
    }

    if (!lobbyDetails) {
        return null;
    }

    // Determine player names (RULE-001: First joiner = White, Second = Black)
    const whitePlayerName = lobbyDetails.users?.[0]?.name || "Unknown";
    const blackPlayerName = lobbyDetails.users?.[1]?.name || null;
    const isWaiting = !blackPlayerName;

    // Determine which player is current user
    const isWhite = currentUserName === whitePlayerName;
    const isBlack = currentUserName === blackPlayerName;

    // Set player selection for GameClientContext
    useEffect(() => {
        if (isWhite) {
            gameClientContext.selectPlayer(Player.WHITE);
        } else if (isBlack) {
            gameClientContext.selectPlayer(Player.BLACK);
        }
    }, [isWhite, isBlack]);

    return (
        <Container>
            <Header>
                <BackButton onClick={onBack}>← Back</BackButton>
                <LobbyTitle>Lobby #{lobbyId}</LobbyTitle>
                <div style={{ width: "80px" }} /> {/* Spacer for centering */}
            </Header>

            <PlayersPanel>
                <PlayerRow isCurrentUser={isWhite}>
                    <PlayerIcon>♔</PlayerIcon>
                    <span>White: {whitePlayerName}</span>
                </PlayerRow>
                <PlayerRow isCurrentUser={isBlack}>
                    <PlayerIcon>♚</PlayerIcon>
                    <span>
                        Black:{" "}
                        {blackPlayerName ? (
                            blackPlayerName
                        ) : (
                            <WaitingText />
                        )}
                    </span>
                </PlayerRow>
            </PlayersPanel>

            {!isWaiting && <Board />}
            {isWaiting && (
                <LoadingMessage>
                    <WaitingText />
                </LoadingMessage>
            )}
        </Container>
    );
};
