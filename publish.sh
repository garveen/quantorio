git reset
git branch -D tmp-publish
git checkout -b tmp-publish
npm run build
git add public -f
git commit -m 'publish'
git subtree split --prefix public -b tmp-publish-gh-pages
git push origin tmp-publish-gh-pages:gh-pages --force
git checkout master
git branch -D tmp-publish
git branch -D tmp-publish-gh-pages
npm run parse
