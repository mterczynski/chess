import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface Settings {
    colors: {
        tile: {
            dark: string;
            light: string;
        };
        background: string;
    };
}

export const DEFAULT_SETTINGS: Settings = {
    colors: {
        tile: {
            dark: "#3d73ff",
            light: "white",
        },
        background: "black",
    },
};

const STORAGE_KEY = "chess_settings";

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
    resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: DEFAULT_SETTINGS,
    updateSettings: () => {},
    resetSettings: () => {},
});

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
    children,
}) => {
    const [settings, setSettings] = useState<Settings>(() => {
        // Load settings from local storage on initialization
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    ...DEFAULT_SETTINGS,
                    ...parsed,
                    colors: {
                        ...DEFAULT_SETTINGS.colors,
                        ...parsed.colors,
                        tile: {
                            ...DEFAULT_SETTINGS.colors.tile,
                            ...parsed.colors?.tile,
                        },
                    },
                };
            }
        } catch (error) {
            console.error("Failed to load settings from local storage:", error);
        }
        return DEFAULT_SETTINGS;
    });

    useEffect(() => {
        // Save settings to local storage whenever they change
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error("Failed to save settings to local storage:", error);
        }
    }, [settings]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prev) => ({
            ...prev,
            ...newSettings,
            colors: {
                ...prev.colors,
                ...newSettings.colors,
                tile: {
                    ...prev.colors.tile,
                    ...newSettings.colors?.tile,
                },
            },
        }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <SettingsContext.Provider
            value={{ settings, updateSettings, resetSettings }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
