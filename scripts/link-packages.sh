#!/usr/bin/env bash
# Exit immediately if any command fails
set -e

# This line determines the absolute path to the directory containing this script, regardless of where the script is called from.
# - BASH_SOURCE[0] is the path to this script (build.sh)
# - dirname gets the directory part of that path
# - cd ... && pwd changes to that directory and prints its absolute path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Linking packages...";

cd "$REPO_ROOT/client";
npm unlink game-engine || true; # "If this command fails, ignore the error and continue."

cd "$REPO_ROOT/game-engine";
npm run build;
cd "$REPO_ROOT/game-engine/build";
npm link;

cd "$REPO_ROOT/client";
npm link game-engine;

echo "Packages linked";
