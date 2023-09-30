cd ~/exevo-pan/apps/current-auctions-worker/
yarn build

cp ~/exevo-pan/apps/current-auctions-worker/dist/index.js ~/backups/"$(date +"%H").js"
