#!/usr/bin/env bash
# Exit immediately if any command fails
set -e

# This line determines the absolute path to the directory containing this script, regardless of where the script is called from.
# - BASH_SOURCE[0] is the path to this script (build.sh)
# - dirname gets the directory part of that path
# - cd ... && pwd changes to that directory and prints its absolute path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo '🚧 Building...'
sh "$SCRIPT_DIR/link-packages.sh"
rm -rf "$REPO_ROOT/build"
mkdir "$REPO_ROOT/build"
cd "$REPO_ROOT/client"
npm run build
cp -r "$REPO_ROOT/client/dist" "$REPO_ROOT/build/client"
cd "$REPO_ROOT/game-engine"
npm run build
cp -r "$REPO_ROOT/game-engine/build" "$REPO_ROOT/build/game-engine"

sh ./link-packages.sh

echo '📦 Build done'
