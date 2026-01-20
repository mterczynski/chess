import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "../api/client";
import { Button } from "./Button";
import { UserNavbar } from "./UserNavbar";

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
    onLobbyCreated?: () => void;
}

export const CreateLobbyForm: React.FC<CreateLobbyFormProps> = ({
    onBack,
    onLobbyCreated,
}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const createLobbyMutation = useMutation({
        mutationFn: () => api.lobby.create(password || undefined),
        onSuccess: () => {
            setError(null);
            // Invalidate lobbies query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["lobbies"] });
            if (onLobbyCreated) onLobbyCreated();
            onBack();
        },
        onError: (error: ApiError) => {
            setError(error.message || "Failed to create lobby.");
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        createLobbyMutation.mutate();
    };

    return (
        <Wrapper>
            <UserNavbar />
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
