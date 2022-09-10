import { Board as BoardType } from "game-engine";
import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../GameContext";
import { File } from "./File";

const BoardContainer = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const Board = () => {
    const gameContext = useContext(GameContext);
    const files = Object.values(gameContext.board);

    return (
        <BoardContainer>
            {files.map((file, fileIndex) => (
                <File file={file} fileIndex={fileIndex} key={fileIndex}></File>
            ))}
        </BoardContainer>
    );
};
