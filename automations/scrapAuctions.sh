#!/bin/bash
cd ~/exevo-pan/apps/bazaar-scraper/
yarn scrap:auctions

cp ~/exevo-pan/apps/bazaar-scraper/Output/ServerData.json ~/exevo-pan/static
cp ~/exevo-pan/apps/bazaar-scraper/Output/ActiveServers.json ~/exevo-pan/static
cp ~/exevo-pan/apps/bazaar-scraper/Output/ItemsData.json ~/exevo-pan/static

cd ~/exevo-pan
yarn deploy:static

cp ~/exevo-pan/apps/bazaar-scraper/Output/CurrentAuctions.json ~/exevo-pan/apps/current-auctions-worker/src/Data
cp ~/exevo-pan/apps/bazaar-scraper/Output/ServerData.json ~/exevo-pan/apps/current-auctions-worker/src/Data

cd ~/exevo-pan/apps/current-auctions-worker
yarn deploy:fast

sleep 10s
cd ~/exevo-pan/apps/bazaar-scraper/
yarn revalidate
yarn revalidate highlight-auction
