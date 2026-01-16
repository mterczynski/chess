import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { settings } from "../settings";
import { LobbyDto } from "chess-shared";
import { GameClientContext } from "../contexts/GameClientContext";

// Patch type to include hasPassword for now
export interface LobbyDtoWithPassword extends LobbyDto {
    hasPassword: boolean;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

const LobbyListContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

    const LobbyItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid #222;
    background: #fff;
    cursor: pointer;
    transition:
        background 0.2s,
        color 0.2s,
        box-shadow 0.2s;
    &:hover {
        background: #2d8cff;
        color: #fff;
        box-shadow: 0 2px 8px rgba(45, 140, 255, 0.15);
    }
`;

const PasswordModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PasswordForm = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 300px;
`;

const PasswordInput = styled.input`
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: 1px solid #aaa;
    font-size: 1rem;
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    border: 1px solid ${props => props.variant === 'secondary' ? '#666' : '#2d8cff'};
    background: ${props => props.variant === 'secondary' ? '#fff' : '#2d8cff'};
    color: ${props => props.variant === 'secondary' ? '#333' : '#fff'};
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
    flex: 1;

    &:hover {
        background: ${props => props.variant === 'secondary' ? '#f0f0f0' : '#1861ad'};
    }
`;

const ErrorText = styled.div`
    color: #dc3545;
    font-size: 0.9rem;
`;

export const LobbyList: React.FC<{}> = () => {
    const [lobbies, setLobbies] = useState<LobbyDtoWithPassword[]>([]);
    const [passwordPrompt, setPasswordPrompt] = useState<{
        lobbyId: number;
        show: boolean;
    } | null>(null);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { selectLobby } = useContext(GameClientContext);

    const fetchLobbies = () => {
        fetch(`${settings.serverURL}/lobby`)
            .then((res) => res.json())
            .then((data) => setLobbies(data))
            .catch(() => setLobbies([]));
    };

    useEffect(() => {
        fetchLobbies();
    }, []);

    const handleLobbyClick = (lobby: LobbyDtoWithPassword) => {
        if (lobby.hasPassword) {
            setPasswordPrompt({ lobbyId: lobby.id, show: true });
            setPasswordInput("");
            setError(null);
        } else {
            selectLobby(lobby.id, "");
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordPrompt) return;

        try {
            // Validate password by fetching lobby
            const res = await fetch(
                `${settings.serverURL}/lobby/${passwordPrompt.lobbyId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password: passwordInput }),
                },
            );

            if (!res.ok) {
                if (res.status === 403) {
                    setError("Incorrect password");
                } else {
                    setError("Failed to join lobby");
                }
                return;
            }

            // Password valid, join lobby
            selectLobby(passwordPrompt.lobbyId, passwordInput);
            setPasswordPrompt(null);
        } catch {
            setError("Network error");
        }
    };

    const handleCancelPassword = () => {
        setPasswordPrompt(null);
        setPasswordInput("");
        setError(null);
    };

    return (
        <Wrapper>
            <LobbyListContainer>
                {lobbies.length === 0 && (
                    <div style={{ textAlign: "center", color: "#888" }}>
                        No lobbies available.
                    </div>
                )}
                {lobbies.map((lobby) => (
                    <LobbyItem
                        key={lobby.id}
                        onClick={() => handleLobbyClick(lobby)}
                    >
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            {lobby.users?.[0].name}
                            {lobby.hasPassword && (
                                <img
                                    src={"/assets/lock.png"}
                                    alt="locked"
                                    style={{
                                        width: 18,
                                        height: 18,
                                        marginLeft: 4,
                                    }}
                                />
                            )}
                        </span>
                        <span>{lobby.moves} moves</span>
                    </LobbyItem>
                ))}
            </LobbyListContainer>

            {passwordPrompt?.show && (
                <PasswordModal onClick={handleCancelPassword}>
                    <PasswordForm onClick={(e) => e.stopPropagation()} onSubmit={handlePasswordSubmit}>
                        <h3 style={{ margin: 0 }}>Enter Password</h3>
                        <PasswordInput
                            type="password"
                            placeholder="Lobby password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            autoFocus
                            required
                        />
                        {error && <ErrorText>{error}</ErrorText>}
                        <ButtonRow>
                            <Button type="button" variant="secondary" onClick={handleCancelPassword}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Join
                            </Button>
                        </ButtonRow>
                    </PasswordForm>
                </PasswordModal>
            )}
        </Wrapper>
    );
};
