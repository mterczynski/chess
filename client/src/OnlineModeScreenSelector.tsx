import { useEffect, useState } from "react";
import { CreateLobbyForm } from "./menus/CreateLobbyForm";
import { LobbyList } from "./menus/LobbyList";
import { settings } from "./settings";
import styled from "styled-components";
import { AuthScreen } from "./menus/AuthScreen";
import { UserNavbar } from "./menus/UserNavbar";

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
    const [showCreateForm, setShowCreateForm] = useState(false);
    const jwtKey = settings.localStorageKeys.jwt;
    const [hasJwt, setHasJwt] = useState(
        typeof window !== "undefined" && !!localStorage.getItem(jwtKey),
    );

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

    if (showCreateForm) {
        return <CreateLobbyForm onBack={() => setShowCreateForm(false)} />;
    }

    return (
        <>
            <UserNavbar />
            <CreateButton
                style={{ margin: "2rem auto", display: "block" }}
                onClick={() => setShowCreateForm(true)}
            >
                Create New Lobby
            </CreateButton>
            <LobbyList />
        </>
    );
};

export default OnlineModeScreenSelector;
