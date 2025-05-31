import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { settings } from "../settings";

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

// todo - share API types between client and server
type Lobby = {
    id: number;
    name: string;
    users: { id: number; name: string }[];
    moves: number;
};

export const LobbyList: React.FC<{}> = () => {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);

    const fetchLobbies = () => {
        fetch(`${settings.serverURL}/lobby`)
            .then((res) => res.json())
            .then((data) => setLobbies(data))
            .catch(() => setLobbies([]));
    };

    useEffect(() => {
        fetchLobbies();
    }, []);

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
                        onClick={() => console.log("Lobby clicked")}
                    >
                        <span>{lobby.users?.[0].name}</span>
                        <span>{lobby.moves} moves</span>
                    </LobbyItem>
                ))}
            </LobbyListContainer>
        </Wrapper>
    );
};
