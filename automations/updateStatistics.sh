#!/bin/bash

cd ~/exevo-pan/apps/bazaar-scraper/
yarn update:statistics

cp --verbose ~/exevo-pan/apps/bazaar-scraper/Output/HistoryStatistics.json ~/exevo-pan/static

cd ~/exevo-pan
yarn deploy:static

sleep 10s
cd ~/exevo-pan/apps/bazaar-scraper/
yarn revalidate statistics
yarn revalidate statistics/highscores
