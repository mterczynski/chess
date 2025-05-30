import { useContext, useEffect, useState } from "react";
import { Board } from "./board/Board";
import { GameClientContext } from "./contexts/GameClientContext";
import { PlayerSelectionScreen } from "./menus/PlayerSelectionScreen";
import { ModeSelectionScreen } from "./menus/ModeSelectionScreen";
import { GameMode } from "./GameMode";
import { LobbyList } from "./menus/LobbyList";
import { RegisterUserForm } from "./menus/RegisterUserForm";
import { settings } from "./settings";
import { LoginUserForm } from "./menus/LoginUserForm";

const OnlineModeScreenSelector = () => {
    const [showRegister, setShowRegister] = useState(false); // false = login, true = register
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

    // Optionally, update hasJwt after registration/login in the same tab
    // You can call setHasJwt(true) in your registration/login form after saving the token

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

    return <LobbyList />;
};

export const GameScreenSelector = () => {
    const gameClientContext = useContext(GameClientContext);
    const mode = gameClientContext.gameMode;
    const setMode = gameClientContext.setGameMode;

    if (!mode) {
        return <ModeSelectionScreen onSelect={setMode} />;
    }

    // Skip player selection in offline PvP mode
    if (mode === GameMode.VS_PLAYER_OFFLINE) {
        return <Board />;
    }

    if (mode === GameMode.VS_PLAYER_ONLINE) {
        return <OnlineModeScreenSelector />;
    }

    if (
        mode === GameMode.VS_BOT &&
        gameClientContext.playerSelection === null
    ) {
        return <PlayerSelectionScreen mode={mode} />;
    }

    return <Board />;
};
