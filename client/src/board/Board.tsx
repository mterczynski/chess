import { useContext } from "react";
import styled from "styled-components";
import { GameEngineContext } from "../GameEngineContext";
import { File } from "./File";
import { InfoBar } from "./InfoBar";
import { PromotionMenu } from "./PromotionMenu";

const BoardContainer = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

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
    const files = Object.values(gameEngineContext.board);

    return (
        <>
            <InfoBar />
            <BoardContainer>
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
