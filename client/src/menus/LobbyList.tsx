import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CreateLobbyForm } from "./CreateLobbyForm";
import { settings } from "../settings";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

const CreateButton = styled.button`
    margin-bottom: 2rem;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    border-radius: 8px;
    border: 2px solid #222;
    background: #2d8cff;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition:
        background 0.2s,
        color 0.2s;
    &:hover {
        background: #1861ad;
    }
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

type Lobby = {
    id: number;
    name: string;
    moves: number;
};

export const LobbyList: React.FC<{}> = () => {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [joiningLobby, setJoiningLobby] = useState<Lobby | null>(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${settings.serverURL}/lobby`)
            .then((res) => res.json())
            .then((data) => setLobbies(data))
            .catch(() => setLobbies([]));
    }, []);

    const handleJoinLobby = async (lobby: Lobby) => {
        setJoiningLobby(lobby);
        setPassword("");
        setError(null);
    };

    const handleSubmitPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!joiningLobby) return;
        try {
            const res = await fetch(
                `${settings.serverURL}/lobby/${joiningLobby.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password }),
                },
            );
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Failed to join lobby.");
                return;
            }
            // Redirect to board/game screen (implement route as needed)
            navigate(`/lobby/${joiningLobby.id}`);
        } catch {
            setError("Failed to join lobby.");
        }
    };

    if (showCreateForm) {
        return <CreateLobbyForm onBack={() => setShowCreateForm(false)} />;
    }

    return (
        <Wrapper>
            <CreateButton onClick={() => setShowCreateForm(true)}>
                Create New Lobby
            </CreateButton>
            <LobbyListContainer>
                {lobbies.length === 0 && (
                    <div style={{ textAlign: "center", color: "#888" }}>
                        No lobbies available.
                    </div>
                )}
                {lobbies.map((lobby) => (
                    <LobbyItem
                        key={lobby.id}
                        onClick={() => handleJoinLobby(lobby)}
                    >
                        <span>{lobby.name}</span>
                        <span>{lobby.moves} moves</span>
                    </LobbyItem>
                ))}
            </LobbyListContainer>
            {joiningLobby && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <form
                        style={{
                            background: "#fff",
                            padding: 32,
                            borderRadius: 8,
                        }}
                        onSubmit={handleSubmitPassword}
                    >
                        <h3>Enter password for {joiningLobby.name}</h3>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        {error && <div style={{ color: "red" }}>{error}</div>}
                        <div style={{ marginTop: 16 }}>
                            <button
                                type="button"
                                onClick={() => setJoiningLobby(null)}
                            >
                                Cancel
                            </button>
                            <button type="submit" style={{ marginLeft: 8 }}>
                                Join
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </Wrapper>
    );
};
