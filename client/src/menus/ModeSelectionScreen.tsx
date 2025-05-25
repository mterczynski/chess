import React from "react";
import styled from "styled-components";
import { GameMode } from "../GameMode";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Title = styled.h2`
    margin-bottom: 2rem;
    color: white;
`;

const ModeButton = styled.button<{ color: string; disabled?: boolean }>`
    margin: 0.5rem 0;
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    border-radius: 8px;
    border: 2px solid #222;
    background: ${({ color }) => color};
    color: ${({ disabled }) => (disabled ? "#aaa" : "#fff")};
    font-weight: 600;
    cursor: pointer;
    transition:
        background 0.2s,
        color 0.2s,
        box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(45, 140, 255, 0.08);
    ${({ disabled }) =>
        !disabled &&
        ` &:hover {
        filter: brightness(0.95);
        box-shadow: 0 4px 16px rgba(45, 140, 255, 0.15);
    }`}
`;

interface ModeSelectionScreenProps {
    onSelect: (mode: GameMode) => void;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({
    onSelect,
}) => (
    <Wrapper>
        <Title>Select Game Mode</Title>
        <ModeButton color="#ffb347" onClick={() => onSelect(GameMode.VS_BOT)}>
            🤖 Play vs Bot
        </ModeButton>
        <ModeButton
            color="#6ee7b7"
            onClick={() => onSelect(GameMode.VS_PLAYER_OFFLINE)}
        >
            🧑 Play vs Player locally
        </ModeButton>
        <ModeButton
            color="#7dd3fc"
            onClick={() => onSelect(GameMode.VS_PLAYER_ONLINE)}
        >
            🌐 Play vs Player online (work in progress)
        </ModeButton>
    </Wrapper>
);
