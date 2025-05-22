import { useContext } from "react";
import styled from "styled-components";
import { GameEngineContext } from "../GameEngineContext";
import { File } from "./File";
import { InfoBar } from "./InfoBar";
import { PromotionMenu } from "./PromotionMenu";
import { GameClientContext } from "../GameClientContext";
import { Player } from "game-engine";

const BoardContainer = styled.div<{ useBlackPerspective?: boolean }>`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${({ useBlackPerspective }) =>
        useBlackPerspective ? "translate(50%, 50%)" : "translate(-50%, -50%)"};
    rotate: ${({ useBlackPerspective }) =>
        useBlackPerspective ? "180deg" : "0deg"};
    width: 100%;
    height: 100%;
    max-width: 560px;
    max-height: 560px;
    /* Ensure child columns (files) have right border except last */
    & > div {
        border-right: 2px solid black;
    }
    & > div:last-child {
        border-right: none;
    }
`;

export const Board = () => {
    const gameEngineContext = useContext(GameEngineContext);
    const gameClientContext = useContext(GameClientContext);
    const files = Object.values(gameEngineContext.board);

    return (
        <>
            <InfoBar />
            <BoardContainer
                useBlackPerspective={
                    gameClientContext.playerSelection === Player.BLACK
                }
            >
                {files.map((file, fileIndex) => (
                    <File
                        file={file}
                        fileIndex={fileIndex}
                        key={fileIndex}
                    ></File>
                ))}
                <PromotionMenu />
            </BoardContainer>
        </>
    );
};
