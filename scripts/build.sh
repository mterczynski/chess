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

# todo - standarize build folders - use either dist or build, not both
echo '🚧 Building...'
cd "$REPO_ROOT/client"
rm -rf ./dist
npm run build

cd "$REPO_ROOT/game-engine"
rm -rf ./build
npm run build

echo '📦 Build done'
