#!/bin/bash

cd ~/exevo-pan/apps/bazaar-scraper/
yarn update:statistics

yarn revalidate statistics
yarn revalidate statistics/highscores