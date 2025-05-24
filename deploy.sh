# 1. Reinstall, test, build
npm run cleanup;
npm i;
npm run test;
npm run build;

# 2. Move build to mterczynski.github.io
cp -r ./client/dist/* ../mterczynski.github.io/chess/
cd ../mterczynski.github.io

# 3. Commit and push
git add .
git commit -a -m "Update chess build"
git push
