import { useEffect, useState, useContext } from "react";
import { CreateLobbyForm } from "./menus/CreateLobbyForm";
import { LobbyList } from "./menus/LobbyList";
import { LobbyRoom } from "./menus/LobbyRoom";
import { settings } from "./settings";
import styled from "styled-components";
import { AuthScreen } from "./menus/AuthScreen";
import { UserNavbar } from "./menus/UserNavbar";
import { GameClientContext } from "./contexts/GameClientContext";

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

const OnlineModeScreenSelector = () => {
    const [showRegister, setShowRegister] = useState(false); // false = login, true = register
    const jwtKey = settings.localStorageKeys.jwt;
    const [hasJwt, setHasJwt] = useState(
        typeof window !== "undefined" && !!localStorage.getItem(jwtKey),
    );

    const { onlineLobby, setLobbyScreen, leaveLobby } = useContext(GameClientContext);

    useEffect(() => {
        const handleStorage = () => {
            setHasJwt(!!localStorage.getItem(jwtKey));
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [jwtKey]);

    if (!hasJwt) {
        return (
            <AuthScreen
                showRegister={showRegister}
                setShowRegister={setShowRegister}
                setHasJwt={setHasJwt}
            />
        );
    }

    // Show LobbyRoom if user selected a lobby
    if (onlineLobby.currentScreen === 'room' && onlineLobby.selectedLobbyId) {
        return (
            <LobbyRoom
                lobbyId={onlineLobby.selectedLobbyId}
                password={onlineLobby.lobbyPassword || ""}
                onBack={leaveLobby}
            />
        );
    }

    // Show CreateLobbyForm
    if (onlineLobby.currentScreen === 'create') {
        return (
            <CreateLobbyForm 
                onBack={() => setLobbyScreen('list')} 
                onLobbyCreated={() => setLobbyScreen('list')}
            />
        );
    }

    // Default: Show lobby list
    return (
        <>
            <UserNavbar />
            <CreateButton
                style={{ margin: "2rem auto", display: "block" }}
                onClick={() => setLobbyScreen('create')}
            >
                Create New Lobby
            </CreateButton>
            <LobbyList />
        </>
    );
};

export default OnlineModeScreenSelector;
