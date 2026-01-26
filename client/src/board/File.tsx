import { Piece } from "game-engine";
import { useContext } from "react";
import styled from "styled-components";
import { SettingsContext } from "../contexts/SettingsContext";
import { settings } from "../settings";
import { Tile } from "./Tile";

const FileContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;

    :first-child {
        border-left: ${settings.borderStyle};
    }
`;

interface FileProps {
    file: (Piece | null)[];
    fileIndex: number;
}

export const File = ({ file, fileIndex }: FileProps) => {
    const { settings: userSettings } = useContext(SettingsContext);

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
                                ? userSettings.colors.tile.light
                                : userSettings.colors.tile.dark
                        }
                        piece={tile}
                    ></Tile>
                );
            })}
        </FileContainer>
    );
};
