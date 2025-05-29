import React, { useContext, useState } from "react";
import styled from "styled-components";
import { settings } from "../settings";
import { GameClientContext } from "../contexts/GameClientContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(45, 140, 255, 0.08);
`;

const Input = styled.input`
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: 1px solid #aaa;
    font-size: 1rem;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

const Button = styled.button<{ gray?: boolean }>`
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    border: none;
    background: ${({ gray }) => (gray ? "#ccc" : "#2d8cff")};
    color: ${({ gray }) => (gray ? "#222" : "#fff")};
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: ${({ gray }) => (gray ? "#bbb" : "#1861ad")};
    }
`;

export const LoginUserForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const jwtKey = settings.localStorageKeys.jwt;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name || !password) {
            setError("Please enter both username and password.");
            return;
        }
        try {
            const res = await fetch(`${settings.serverURL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Login failed.");
                return;
            } else {
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem(jwtKey, data.token);
                }
                setLoggedIn(true);
            }
        } catch {
            setError("Login failed.");
        }
    };

    if (loggedIn) return null;

    return (
        <Wrapper>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    maxLength={15}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={64}
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
                <ButtonRow>
                    <Button type="button" gray>
                        Back
                    </Button>
                    <Button type="submit">Login</Button>
                </ButtonRow>
            </Form>
        </Wrapper>
    );
};
