sh scripts/cleanEnvOverrides.sh

# setuping: current-auctions-worker
cp apps/bazaar-scraper/Output/CurrentAuctions.json apps/current-auctions-worker/src/Data/
cp apps/bazaar-scraper/Output/ServerData.json apps/current-auctions-worker/src/Data/

# setuping: history-server app
cp apps/bazaar-scraper/Output/ServerData.json apps/history-server/src/Data
cp apps/bazaar-scraper/Output/HistoryAuctions.jsonl apps/history-server/src/Data
