import React, { useContext } from "react";
import styled from "styled-components";
import { SettingsContext } from "../contexts/SettingsContext";
import { Button } from "../menus/Button";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Panel = styled.div`
    background: #1a1a1a;
    border-radius: 12px;
    padding: 2rem;
    min-width: 400px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
    color: white;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const SettingRow = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label`
    display: block;
    color: white;
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

const ColorInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const ColorInput = styled.input`
    width: 80px;
    height: 40px;
    border: 2px solid #333;
    border-radius: 6px;
    cursor: pointer;
    background: transparent;
`;

const ColorPreview = styled.div<{ color: string }>`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: ${({ color }) => color};
    border: 2px solid #333;
`;

const ColorValue = styled.span`
    color: #999;
    font-family: monospace;
    font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: #999;
    font-size: 1.5rem;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
        background: #333;
        color: white;
    }
`;

interface SettingsPanelProps {
    onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
    const { settings, updateSettings, resetSettings } =
        useContext(SettingsContext);

    const handleColorChange = (path: string[], value: string) => {
        if (path.length === 3 && path[0] === "colors" && path[1] === "tile") {
            // Handle tile colors (dark/light)
            updateSettings({
                colors: {
                    ...settings.colors,
                    tile: {
                        ...settings.colors.tile,
                        [path[2]]: value,
                    },
                },
            });
        } else if (
            path.length === 2 &&
            path[0] === "colors" &&
            path[1] === "background"
        ) {
            // Handle background color
            updateSettings({
                colors: {
                    ...settings.colors,
                    background: value,
                },
            });
        }
    };

    const handleReset = () => {
        resetSettings();
    };

    return (
        <Overlay onClick={onClose}>
            <Panel onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>⚙️ Settings</Title>

                <SettingRow>
                    <Label>Light Tile Color</Label>
                    <ColorInputWrapper>
                        <ColorInput
                            type="color"
                            value={settings.colors.tile.light}
                            onChange={(e) =>
                                handleColorChange(
                                    ["colors", "tile", "light"],
                                    e.target.value
                                )
                            }
                        />
                        <ColorPreview color={settings.colors.tile.light} />
                        <ColorValue>{settings.colors.tile.light}</ColorValue>
                    </ColorInputWrapper>
                </SettingRow>

                <SettingRow>
                    <Label>Dark Tile Color</Label>
                    <ColorInputWrapper>
                        <ColorInput
                            type="color"
                            value={settings.colors.tile.dark}
                            onChange={(e) =>
                                handleColorChange(
                                    ["colors", "tile", "dark"],
                                    e.target.value
                                )
                            }
                        />
                        <ColorPreview color={settings.colors.tile.dark} />
                        <ColorValue>{settings.colors.tile.dark}</ColorValue>
                    </ColorInputWrapper>
                </SettingRow>

                <SettingRow>
                    <Label>Background Color</Label>
                    <ColorInputWrapper>
                        <ColorInput
                            type="color"
                            value={settings.colors.background}
                            onChange={(e) =>
                                handleColorChange(
                                    ["colors", "background"],
                                    e.target.value
                                )
                            }
                        />
                        <ColorPreview color={settings.colors.background} />
                        <ColorValue>{settings.colors.background}</ColorValue>
                    </ColorInputWrapper>
                </SettingRow>

                <ButtonGroup>
                    <Button onClick={handleReset} gray>
                        Reset to Defaults
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </ButtonGroup>
            </Panel>
        </Overlay>
    );
};
