import { Board as BoardType } from "game-engine";
import styled from "styled-components";
import { File } from "./File";

const BoardContainer = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

interface BoardProps {
    state: BoardType;
}

export const Board = ({ state }: BoardProps) => {
    const files = Object.values(state);

    return (
        <BoardContainer>
            {files.map((file, fileIndex) => (
                <File file={file} fileIndex={fileIndex} key={fileIndex}></File>
            ))}
        </BoardContainer>
    );
};
