#!/bin/bash
cd ~/exevo-pan/apps/bazaar-scraper/
yarn scrap:history

~/exevo-pan/automations/updateStatistics.sh

cp ~/exevo-pan/apps/bazaar-scraper/Output/ServerData.json ~/exevo-pan/apps/history-server/src/Data
cp ~/exevo-pan/apps/bazaar-scraper/Output/HistoryAuctions.jsonl ~/exevo-pan/apps/history-server/src/Data

pm2 restart HistoryServer