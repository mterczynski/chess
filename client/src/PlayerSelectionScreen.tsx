import { Player } from "game-engine";
import { useContext } from "react";
import styled from "styled-components";
import { GameClientContext } from "./GameClientContext";

const Container = styled.div`
    position: absolute;
    color: white;
    font-size: 42px;
    background-color: #4b4b4b;
    width: 100%;
    height: 100%;
    max-width: 480px;
    max-height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Button = styled.button<{ background?: string; color?: string }>`
    cursor: pointer;
    font-size: 28px;
    margin-right: 0.5em;
    margin-left: 0.5em;
    background: ${({ background }) => background};
    color: ${({ color }) => color};
`;

export const PlayerSelectionScreen = () => {
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
