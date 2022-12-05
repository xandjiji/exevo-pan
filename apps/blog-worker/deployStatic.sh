cp -R ~/exevo-pan/apps/blog-worker/_posts/ ~/exevo-pan/static

cd ~/exevo-pan
yarn deploy:static

sleep 10s