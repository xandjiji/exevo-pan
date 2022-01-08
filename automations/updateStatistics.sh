#!/bin/bash

cd ~/exevo-pan/apps/bazaar-scraper/
yarn update:statistics

cp ~/exevo-pan/apps/bazaar-scraper/Output/HistoryStatistics.json ~/exevo-pan/apps/bazaar-scraper/Output/static
sh ~/exevo-pan/apps/bazaar-scraper/Output/static/deployStatic.sh
