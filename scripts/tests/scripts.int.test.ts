import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// run all important scripts in the correct order, check that they work
describe("scripts integration test", () => {
    const repoRoot = process.cwd();
    const rootNodeModules = path.join(repoRoot, "node_modules");

    it("1. cleanup - removes node_modules and other build artifacts", () => {
        const cleanupScript = path.join(repoRoot, "scripts", "cleanup.sh");
        expect(() => {
            execSync(`sh "${cleanupScript}"`, { cwd: repoRoot, stdio: "inherit" });
        }).not.toThrow();
        expect(fs.existsSync(rootNodeModules)).toBe(false);
    });

    it("2. npm install (with link-packages in postinstall) - runs without throwing and links packages", () => {
        const linkScript = path.join(repoRoot, "scripts", "link-packages.sh");
        expect(() => {
            execSync(`sh "${linkScript}"`, { cwd: repoRoot, stdio: "inherit" });
        }).not.toThrow();

        // Check that the symlink exists in /node_modules/game-engine
        const gameEngineSymlinkPath = path.join(rootNodeModules, "game-engine");
        expect(fs.existsSync(gameEngineSymlinkPath)).toBe(true);
        const gameEngineStat = fs.lstatSync(gameEngineSymlinkPath);
        expect(gameEngineStat.isSymbolicLink()).toBe(true);

         // Check that the symlink exists in /node_modules/game-engine
        const clientSymlinkPath = path.join(rootNodeModules, "client");
        expect(fs.existsSync(gameEngineSymlinkPath)).toBe(true);
        const clientStat = fs.lstatSync(gameEngineSymlinkPath);
        expect(gameEngineStat.isSymbolicLink()).toBe(true);
    });
});
