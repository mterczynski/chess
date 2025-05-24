import { Player } from "game-engine";
import { useContext } from "react";
import styled from "styled-components";
import { GameClientContext } from "./GameClientContext";
import { GameMode } from "./GameMode";

const Container = styled.div`
    position: absolute;
    color: white;
    font-size: 2.2rem;
    background: rgba(40, 40, 40, 0.98);
    width: 95vw;
    max-width: 350px;
    min-width: 220px;
    height: auto;
    padding: 2.5rem 1.5rem 2rem 1.5rem;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
`;

const Button = styled.button<{ background?: string; color?: string }>`
    cursor: pointer;
    font-size: 1.4rem;
    margin: 1.2rem 1.2rem 0 1.2rem;
    padding: 0.7em 2.2em;
    border-radius: 12px;
    border: 2px solid #fff;
    background: ${({ background }) => background || "#fff"};
    color: ${({ color }) => color || "#222"};
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: background 0.2s, color 0.2s, transform 0.1s, border 0.2s;
    &:hover,
    &:focus {
        background: #3d73ff;
        color: #fff;
        border: 2px solid #3d73ff;
        transform: translateY(-2px) scale(1.04);
        outline: none;
    }
`;

interface PlayerSelectionScreenProps {
    mode?: GameMode;
}

export const PlayerSelectionScreen = ({ mode }: PlayerSelectionScreenProps) => {
    const gameClientContext = useContext(GameClientContext);

    return (
        <Container>
            <header>Play as:</header>

            <div>
                <Button
                    onClick={() => gameClientContext.selectPlayer(Player.WHITE)}
                >
                    White
                </Button>
                <Button
                    onClick={() => gameClientContext.selectPlayer(Player.BLACK)}
                    background="#222"
                    color="white"
                >
                    Black
                </Button>
            </div>
        </Container>
    );
};
