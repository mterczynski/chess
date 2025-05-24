// import { execSync } from "child_process";
// import fs from "fs";
// import path from "path";

// IMPORTANT: This test works, but it removes Jest and all pacakges at the end which makes it unusable in current version

describe("cleanup.sh", () => {
    it('is ignored', () => {
        expect(true).toBe(true);
    });

    //     // Use process.cwd() to always get the project root
    //     const repoRoot = process.cwd();
    //     const nodeModules = path.join(repoRoot, "node_modules");
    //     const coverage = path.join(repoRoot, "coverage");
    //     const build = path.join(repoRoot, "build");
    //     const clientNodeModules = path.join(repoRoot, "client", "node_modules");
    //     const clientDist = path.join(repoRoot, "client", "dist");
    //     const engineBuild = path.join(repoRoot, "game-engine", "build");

    //     beforeAll(() => {
    //         [nodeModules, coverage, build, clientNodeModules, clientDist, engineBuild].forEach((dir) => {
    //             fs.mkdirSync(dir, { recursive: true });
    //             fs.writeFileSync(path.join(dir, "dummy.txt"), "test");
    //         });
    //     });

    //     it("removes all expected directories", () => {
    //         const cleanupScript = path.join(repoRoot, "scripts", "cleanup.sh");
    //         execSync(`sh "${cleanupScript}"`, { cwd: repoRoot });
    //         [nodeModules, coverage, build, clientNodeModules, clientDist, engineBuild].forEach((dir) => {
    //             expect(fs.existsSync(dir)).toBe(false);
    //         });
    //     });
})

