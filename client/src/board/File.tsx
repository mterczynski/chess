import { Piece } from "game-engine";
import styled from "styled-components";
import { settings } from "../settings";
import { Tile } from "./Tile";

const FileContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;

    :first-child {
        border-left: ${settings.borderStyle};
    }
`;

interface FileProps {
    file: (Piece | null)[];
    fileIndex: number;
}

export const File = ({ file, fileIndex }: FileProps) => {
    return (
        <FileContainer>
            {file.slice(1).map((tile, tileIndex) => {
                return (
                    <Tile
                        fileIndex={fileIndex}
                        tileIndex={tileIndex}
                        key={tileIndex}
                        tileColor={
                            (fileIndex + tileIndex) % 2
                                ? settings.colors.tile.light
                                : settings.colors.tile.dark
                        }
                        piece={tile}
                    ></Tile>
                );
            })}
        </FileContainer>
    );
};
