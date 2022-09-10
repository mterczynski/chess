echo "Linking packages...";

cd ./client;
npm unlink game-engine;

cd ../game-engine;
npm run build;
cd ./build;
npm link;

cd ../../client;
npm link game-engine;

echo "Packages linked";
