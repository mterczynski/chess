#!/usr/bin/env bash
# Exit immediately if any command fails
set -e

# This line determines the absolute path to the directory containing this script, regardless of where the script is called from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"
# 1. Reinstall, test, build
npm run cleanup
npm i
npm run test
npm run build

# 2. Move client build to mterczynski.github.io
cp -r ./client/dist/* ../mterczynski.github.io/chess/
cd ../mterczynski.github.io

# 3. Commit and push
git add .
git commit -a -m "Update chess build"
git push

# todo - deploy server to some free/cheap cloud solution
