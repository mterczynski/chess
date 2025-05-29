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

export const RegisterUserForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const gameClientContext = useContext(GameClientContext);

    const validateName = (value: string) => /^[a-zA-Z0-9_-]{1,15}$/.test(value);
    const validatePassword = (value: string) => value.length >= 6;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateName(name)) {
            setError(
                "Name must be 1-15 characters: letters, digits, hyphens, or underscores.",
            );
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            const res = await fetch(`${settings.serverURL}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });
            if (!res.ok) {
                const data = await res.json();
                if (data.message === "User name already taken") {
                    setError("User name already taken");
                } else {
                    setError(data.message || "Registration failed.");
                }
                return;
            } else {
                const data = await res.json();
                gameClientContext.setUsername(name);
                if (data.token) {
                    localStorage.setItem(
                        settings.localStorageKeys.jwt,
                        data.token,
                    );
                }
            }
        } catch {
            setError("Registration failed.");
        }
    };

    return (
        <Wrapper>
            <h2>Register User</h2>
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
                    <Button type="submit">Register</Button>
                </ButtonRow>
            </Form>
        </Wrapper>
    );
};
