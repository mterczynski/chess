import React, { useState } from "react";
import styled from "styled-components";
import { GameClientContext } from "../contexts/GameClientContext";

const SettingsIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PopupContent = styled.div`
    background: rgb(40, 40, 40);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
    min-width: 220px;
`;

const SettingsPopupContainer = styled.div`
    background: rgb(40, 40, 40);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    min-width: 320px;
`;

const SettingsLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    margin-top: 1rem;
`;

const CloseButton = styled.button`
    margin-top: 24px;
    float: right;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    border: 1px solid #222;
    background: #2d8cff;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
`;

export function SettingsButtonAndPopup() {
    const [showSettings, setShowSettings] = useState(false);
    return (
        <>
            <SettingsIcon onClick={() => setShowSettings(true)}>
                ⚙️
            </SettingsIcon>
            {showSettings && (
                <PopupOverlay onClick={() => setShowSettings(false)}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <SettingsPopup onClose={() => setShowSettings(false)} />
                    </PopupContent>
                </PopupOverlay>
            )}
        </>
    );
}

function SettingsPopup({ onClose }: { onClose: () => void }) {
    const { settings, setSettings } = React.useContext(GameClientContext);
    return (
        <SettingsPopupContainer>
            <h2>Settings</h2>
            <SettingsLabel>
                <input
                    type="checkbox"
                    checked={settings.showPossibleMoves}
                    onChange={(e) =>
                        setSettings((s) => ({
                            ...s,
                            showPossibleMoves: e.target.checked,
                        }))
                    }
                />
                Show possible moves
            </SettingsLabel>
            <CloseButton onClick={onClose}>Close</CloseButton>
        </SettingsPopupContainer>
    );
}
