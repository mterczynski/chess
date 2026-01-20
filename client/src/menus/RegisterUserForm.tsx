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

export const RegisterUserForm = ({
    onRegister,
}: {
    onRegister?: () => void;
}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const registerMutation = useMutation({
        mutationFn: () => api.user.register(name, password),
        onSuccess: (data) => {
            setError(null);
            if (data.token) {
                login(data.token);
                if (onRegister) onRegister();
            }
        },
        onError: (error: ApiError) => {
            if (error.data?.message === "User name already taken") {
                setError("User name already taken");
            } else {
                setError(error.message || "Registration failed.");
            }
        },
    });

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

        registerMutation.mutate();
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
