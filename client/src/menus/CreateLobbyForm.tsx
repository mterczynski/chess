import React, { useState } from "react";
import styled from "styled-components";
import { settings } from "../settings";
import { Button } from "./Button";

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

interface CreateLobbyFormProps {
    onBack: () => void;
}

export const CreateLobbyForm: React.FC<CreateLobbyFormProps> = ({ onBack }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // password is optional
        try {
            const jwt = localStorage.getItem(settings.localStorageKeys.jwt);
            const res = await fetch(`${settings.serverURL}/lobby`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
                },
                body: JSON.stringify({ password: password || undefined }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Failed to create lobby.");
                return;
            }
            onBack();
        } catch {
            setError("Failed to create lobby.");
        }
    };

    return (
        <Wrapper>
            <h2>Create New Lobby</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="password"
                    placeholder="Password (optional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
                <ButtonRow>
                    <Button type="button" gray onClick={onBack}>
                        Back
                    </Button>
                    <Button type="submit">Create</Button>
                </ButtonRow>
            </Form>
        </Wrapper>
    );
};
