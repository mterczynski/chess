import { useEffect, useState } from "react";
import { RegisterUserForm } from "./menus/RegisterUserForm";
import { LoginUserForm } from "./menus/LoginUserForm";
import { CreateLobbyForm } from "./menus/CreateLobbyForm";
import { LobbyList } from "./menus/LobbyList";
import { settings } from "./settings";
import styled from "styled-components";

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
        if (showRegister) {
            return (
                <>
                    <RegisterUserForm onRegister={() => setHasJwt(true)} />
                    <div style={{ textAlign: "center", marginTop: 16 }}>
                        <span>
                            Already have an account?{" "}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowRegister(false);
                                }}
                                style={{
                                    color: "#2d8cff",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Sign in here
                            </a>
                        </span>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <LoginUserForm onLogin={() => setHasJwt(true)} />
                    <div style={{ textAlign: "center", marginTop: 16 }}>
                        <span>
                            Don&apos;t have an account?{" "}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowRegister(true);
                                }}
                                style={{
                                    color: "#2d8cff",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Register now
                            </a>
                        </span>
                    </div>
                </>
            );
        }
    }

    if (showCreateForm) {
        return <CreateLobbyForm onBack={() => setShowCreateForm(false)} />;
    }

    return (
        <>
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
