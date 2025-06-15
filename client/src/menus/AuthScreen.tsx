import { RegisterUserForm } from "./RegisterUserForm";
import { LoginUserForm } from "./LoginUserForm";

export function AuthScreen({
    showRegister,
    setShowRegister,
    setHasJwt,
}: {
    showRegister: boolean;
    setShowRegister: (v: boolean) => void;
    setHasJwt: (v: boolean) => void;
}) {
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
