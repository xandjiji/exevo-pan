#!/bin/bash
cd ~/exevo-pan/apps/bazaar-scraper/
yarn scrap:auctions

cp ~/exevo-pan/apps/bazaar-scraper/Output/ServerData.json ~/exevo-pan/apps/bazaar-scraper/Output/static
cp ~/exevo-pan/apps/bazaar-scraper/Output/ActiveServers.json ~/exevo-pan/apps/bazaar-scraper/Output/static
cp ~/exevo-pan/apps/bazaar-scraper/Output/ItemsData.json ~/exevo-pan/apps/bazaar-scraper/Output/static
sh ~/exevo-pan/apps/bazaar-scraper/Output/static/deployStatic.sh

cp ~/exevo-pan/apps/bazaar-scraper/Output/CurrentAuctions.json ~/exevo-pan/apps/current-auctions-lambda/src/Data
cp ~/exevo-pan/apps/bazaar-scraper/Output/ServerData.json ~/exevo-pan/apps/current-auctions-lambda/src/Data

cd ~/exevo-pan/apps/current-auctions-lambda
yarn deploy:fast

sleep 10s
cd ~/exevo-pan/apps/bazaar-scraper/
yarn revalidate
yarn revalidate highlight-auction