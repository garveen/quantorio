git reset
git branch -D tmp-publish
git checkout -b tmp-publish
npm run build
git add public -f
git commit -m 'publish'
git subtree split --prefix public -b gh-pages
git push origin gh-pages --force
git checkout master
git branch -D tmp-publish
npm run parse
