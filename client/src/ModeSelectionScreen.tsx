import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
`;

const Button = styled.button`
  margin: 0.5rem 0;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: 2px solid #222;
  background: #fff;
  color: #222;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #2d8cff;
    color: #fff;
  }
`;

export type GameMode = "vs-bot" | "vs-player";

interface ModeSelectionScreenProps {
  onSelect: (mode: GameMode) => void;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onSelect }) => (
  <Wrapper>
    <Title>Select Game Mode</Title>
    <Button onClick={() => onSelect("vs-bot")}>Play vs Bot</Button>
    <Button onClick={() => onSelect("vs-player")}>Play vs Player</Button>
  </Wrapper>
);
