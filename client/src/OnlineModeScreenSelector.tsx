import { useEffect, useState } from "react";
import { RegisterUserForm } from "./menus/RegisterUserForm";
import { LoginUserForm } from "./menus/LoginUserForm";
import { LobbyList } from "./menus/LobbyList";
import { settings } from "./settings";

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

export default OnlineModeScreenSelector;
