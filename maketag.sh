git branch -D tmp-publish
git checkout -b tmp-publish
git reset --hard master
npm run build
git add public -f
git commit -m 'assets'
git tag $1
git checkout master
git branch -D tmp-publish
npm run parse