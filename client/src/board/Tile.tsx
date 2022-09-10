import { Piece } from "game-engine";
import { Piece as PieceComponent } from "./Piece";
import styled from "styled-components";
import { borderStyle } from "./border-style";

const TileBackground = styled.div<{ color: string }>`
    position: relative;
    background: ${({ color }) => color};
    border-top: ${borderStyle};
    border-right: ${borderStyle};
    width: 70px;
    height: 70px;

    :first-child {
        border-bottom: ${borderStyle};
    }
`;

interface TileProps {
    tileColor: string;
    piece: Piece | null;
}

export const Tile = ({ piece, tileColor }: TileProps) => {
    return (
        <TileBackground color={tileColor}>
            {piece && (
                <PieceComponent
                    pieceType={piece.type}
                    color={piece.player}
                ></PieceComponent>
            )}
        </TileBackground>
    );
};
