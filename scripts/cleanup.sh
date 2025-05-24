#!/usr/bin/env bash
# Exit immediately if any command fails
set -e

# This line determines the absolute path to the directory containing this script, regardless of where the script is called from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"
rm -rf ./node_modules
rm -rf ./coverage
rm -rf ./build
rm -rf ./game-engine/build
# Client
rm -rf ./client/node_modules
rm -rf ./client/dist
# Server
rm -rf ./server/node_modules
rm -rf ./server/dist
rm -rf ./server/build
