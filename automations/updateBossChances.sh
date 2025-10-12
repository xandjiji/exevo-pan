#!/bin/bash

cd ~/exevo-pan/apps/bazaar-scraper/

timeout 1h bash -c '
yarn update:bosses
'
