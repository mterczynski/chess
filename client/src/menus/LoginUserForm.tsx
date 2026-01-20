import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { api, ApiError } from "../api/client";
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

export const LoginUserForm = ({ onLogin }: { onLogin?: () => void }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const { login } = useAuth();

    const loginMutation = useMutation({
        mutationFn: () => api.user.login(name, password),
        onSuccess: (data) => {
            setError(null);
            if (data.token) {
                login(data.token);
                if (onLogin) onLogin();
            }
            setLoggedIn(true);
        },
        onError: (error: ApiError) => {
            setError(error.message || "Login failed.");
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name || !password) {
            setError("Please enter both username and password.");
            return;
        }
        loginMutation.mutate();
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
