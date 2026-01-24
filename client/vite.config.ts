import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
    },
    base: "./",
    resolve: {
        alias: {
            "game-engine": path.resolve(__dirname, "../game-engine"),
            "chess-shared": path.resolve(__dirname, "../shared"),
        },
    },
});
