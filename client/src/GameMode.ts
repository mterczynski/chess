export enum GameMode {
    VS_BOT = "vs_bot",
    VS_GEMINI = "vs_gemini",
    VS_PLAYER_OFFLINE = "vs_player_offline",
    VS_PLAYER_ONLINE = "vs_player_online",
}

/** Modes where the opponent is controlled by the computer (bot or AI model) */
export function isVsAiMode(mode: GameMode | null): boolean {
    return mode === GameMode.VS_BOT || mode === GameMode.VS_GEMINI;
}
