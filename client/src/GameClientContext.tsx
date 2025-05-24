import {
    GameState,
    Move,
    Player,
    mapIndexToChessFile,
    mapRankIndexToRank,
    Position,
    CaptureIfAvailableBot,
} from "game-engine";
import _ from "lodash";
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { GameEngineContext } from "./GameEngineContext";
import { handleGameEnd } from "./handle-game-end";
import { GameMode } from "./GameMode";

interface SelectedPiece {
    fileIndex: number;
    tileIndex: number;
}

/** Context responsible for handling client specific events & data */
export const GameClientContext = React.createContext<{
    selectedPiece: SelectedPiece | null;
    setSelectedPiece: React.Dispatch<
        React.SetStateAction<SelectedPiece | null>
    >;
    availableMoves: Move[];
    setAvailableMoves: React.Dispatch<React.SetStateAction<Move[]>>;
    promotionMenuPosition: Position | null;
    setPromotionMenuPosition: React.Dispatch<
        React.SetStateAction<Position | null>
    >;
    selectPlayer: (player: Player | null) => void;
    playerSelection: Player | null;
    playerTurnTimeoutRef: React.MutableRefObject<any>;
    gameMode: GameMode | null;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode | null>>;
}>({} as any);

export const GameClientContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(
        null
    );
    const [playerSelection, setPlayerSelection] = useState<Player | null>(null);
    const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
    const [promotionMenuPosition, setPromotionMenuPosition] =
        useState<Position | null>(null); // stores null or promoting position
    const [gameMode, setGameMode] = useState<GameMode | null>(null);

    const {
        availableMovesForPlayer,
        move: engineMove,
        state,
        currentPlayer,
        board,
    } = useContext(GameEngineContext);

    const playerTurnTimeoutRef = useRef<any>(null);
    const bot = new CaptureIfAvailableBot();

    const selectPlayer = useCallback((player: Player | null) => {
        setPlayerSelection(player);
    }, []);

    useEffect(() => {
        if (
            playerSelection !== null &&
            currentPlayer !== playerSelection &&
            currentPlayer &&
            (state === GameState.UNSTARTED || state === GameState.IN_PROGRESS)
        ) {
            if (playerTurnTimeoutRef.current) {
                clearTimeout(playerTurnTimeoutRef.current);
            }
            playerTurnTimeoutRef.current = setTimeout(() => {
                const move = bot.makeMove(board, availableMovesForPlayer);
                engineMove(move);
            }, 650);
        }
    }, [
        currentPlayer,
        playerSelection,
        state,
        availableMovesForPlayer,
        engineMove,
        board,
    ]);

    useEffect(() => {
        // setTimeout used to display last played move before showing an alert
        setTimeout(() => {
            if (!gameMode) {
                throw new Error("Game mode is not set");
            }
            handleGameEnd(state, playerSelection!, gameMode);
        });
    }, [playerSelection, state]);

    // update available moves after selecting a piece
    useEffect(() => {
        if (!selectedPiece) {
            setAvailableMoves([]);
            return;
        }

        const availableSelectedPieceMoves = availableMovesForPlayer.filter(
            (move) =>
                move.from.file ===
                    mapIndexToChessFile(selectedPiece.fileIndex) &&
                move.from.rank === mapRankIndexToRank(selectedPiece.tileIndex)
        );
        setAvailableMoves(availableSelectedPieceMoves);
    }, [selectedPiece, availableMovesForPlayer]);

    return (
        <GameClientContext.Provider
            value={{
                selectedPiece,
                setSelectedPiece,
                availableMoves,
                setAvailableMoves,
                promotionMenuPosition,
                setPromotionMenuPosition,
                selectPlayer,
                playerSelection,
                playerTurnTimeoutRef,
                gameMode,
                setGameMode,
            }}
        >
            {children}
        </GameClientContext.Provider>
    );
};
