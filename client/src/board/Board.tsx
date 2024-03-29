import { useContext } from "react";
import styled from "styled-components";
import { GameEngineContext } from "../GameEngineContext";
import { File } from "./File";
import { PromotionMenu } from "./PromotionMenu";

const BoardContainer = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const Board = () => {
    const gameEngineContext = useContext(GameEngineContext);
    const files = Object.values(gameEngineContext.board);

    return (
        <BoardContainer>
            {files.map((file, fileIndex) => (
                <File file={file} fileIndex={fileIndex} key={fileIndex}></File>
            ))}
            <PromotionMenu />
        </BoardContainer>
    );
};
