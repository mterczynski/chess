import { useContext, useState } from "react";
import styled from "styled-components";
import { GeminiSettingsContext } from "./GeminiSettingsContext";
import {
    GEMINI_MODELS,
    GeminiModel,
    MAX_GEMINI_ELO,
    MIN_GEMINI_ELO,
} from "./geminiSettings";

const Panel = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem;
    width: 260px;
    background: rgba(20, 20, 30, 0.95);
    border: 1px solid #2b3a8f;
    border-radius: 10px;
    color: #fff;
    z-index: 100;
`;

const PanelTitle = styled.div`
    font-weight: 600;
    font-size: 1rem;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: #b3c0f0;
`;

const ApiKeyInput = styled.input`
    padding: 0.5em;
    border-radius: 6px;
    border: 1px solid #444;
    background: #15151f;
    color: #fff;
    font-size: 0.85rem;
`;

const ModelSelect = styled.select`
    padding: 0.5em;
    border-radius: 6px;
    border: 1px solid #444;
    background: #15151f;
    color: #fff;
    font-size: 0.85rem;
`;

export const GeminiSettingsPanel = () => {
    const { apiKey, setApiKey, elo, setElo, model, setModel } = useContext(
        GeminiSettingsContext,
    );
    // Local draft so the key is only committed on blur/Enter, not per keystroke
    const [apiKeyDraft, setApiKeyDraft] = useState(apiKey);

    return (
        <Panel>
            <PanelTitle>✨ Gemini settings</PanelTitle>

            <Label>
                Gemini API Key
                <ApiKeyInput
                    type="password"
                    placeholder="Insert your own Gemini API Key"
                    value={apiKeyDraft}
                    onChange={(event) => setApiKeyDraft(event.target.value)}
                    onBlur={() => setApiKey(apiKeyDraft.trim())}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            setApiKey(apiKeyDraft.trim());
                        }
                    }}
                />
            </Label>

            <Label>
                Difficulty (FIDE rating): {elo}
                <input
                    type="range"
                    min={MIN_GEMINI_ELO}
                    max={MAX_GEMINI_ELO}
                    step={50}
                    value={elo}
                    onChange={(event) => setElo(Number(event.target.value))}
                />
            </Label>

            <Label>
                Model
                <ModelSelect
                    value={model}
                    onChange={(event) =>
                        setModel(event.target.value as GeminiModel)
                    }
                >
                    {GEMINI_MODELS.map((modelName) => (
                        <option key={modelName} value={modelName}>
                            {modelName}
                        </option>
                    ))}
                </ModelSelect>
            </Label>
        </Panel>
    );
};
