import React, { useState } from "react";
import {
    DEFAULT_GEMINI_ELO,
    DEFAULT_GEMINI_MODEL,
    GeminiModel,
} from "./geminiSettings";

/** Context holding user-provided settings for the "vs Gemini" mode */
export const GeminiSettingsContext = React.createContext<{
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    elo: number;
    setElo: React.Dispatch<React.SetStateAction<number>>;
    model: GeminiModel;
    setModel: React.Dispatch<React.SetStateAction<GeminiModel>>;
}>({} as any);

export const GeminiSettingsContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [apiKey, setApiKey] = useState("");
    const [elo, setElo] = useState(DEFAULT_GEMINI_ELO);
    const [model, setModel] = useState<GeminiModel>(DEFAULT_GEMINI_MODEL);

    return (
        <GeminiSettingsContext.Provider
            value={{ apiKey, setApiKey, elo, setElo, model, setModel }}
        >
            {children}
        </GeminiSettingsContext.Provider>
    );
};
