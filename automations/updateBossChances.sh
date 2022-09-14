#!/bin/bash

cd ~/exevo-pan/apps/bazaar-scraper/
yarn update:bosses

cp -R ~/exevo-pan/apps/bazaar-scraper/Output/bossChances/ ~/exevo-pan/apps/bazaar-scraper/Output/static
sh ~/exevo-pan/apps/bazaar-scraper/Output/static/deployStatic.sh

sleep 10s
cd ~/exevo-pan/apps/bazaar-scraper/

# @ ToDo: revalidate boss pages
#yarn revalidate statistics
#yarn revalidate statistics/highscores