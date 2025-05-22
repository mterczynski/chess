import { useContext } from "react";
import styled from "styled-components";
import { GameEngineContext } from "../GameEngineContext";
import { File } from "./File";
import { PromotionMenu } from "./PromotionMenu";
import { Player } from "game-engine";

const InfoBar = styled.div`
    width: 100%;
    max-width: 560px;
    margin: 0 auto 10px auto;
    padding: 0.7em 0;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    // background: #3d73ff;
    // border-radius: 10px 10px 0 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    letter-spacing: 0.5px;
    top: 30px;
`;

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
    const currentPlayer = gameEngineContext.currentPlayer;

    let infoText = null;
    if (currentPlayer === undefined || currentPlayer === null) {
        infoText = "Game Over";
    } else if (currentPlayer === Player.WHITE) {
        infoText = "White's turn";
    } else if (currentPlayer === Player.BLACK) {
        infoText = "Black's turn";
    } else {
        infoText = `${currentPlayer}'s turn`;
    }

    return (
        <>
            <InfoBar>{infoText}</InfoBar>
            <BoardContainer>
                {files.map((file, fileIndex) => (
                    <File file={file} fileIndex={fileIndex} key={fileIndex}></File>
                ))}
                <PromotionMenu />
            </BoardContainer>
        </>
    );
};
