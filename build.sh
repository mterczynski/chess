echo '🚧 Building...';
sh ./link-packages.sh;
rm -rf ./build;
mkdir build;
cd ./client;
npm run build;
cp -r ./build ../build/client;
cd ../game-engine;
npm run build;
cp -r ./build ../build/game-engine;
# remove existing links
cd ../client;
npm unlink game-engine;
# link builded packages
cd ../build/game-engine;
npm link;
cd ../client;
npm link game-engine;

echo '📦 Build done'
