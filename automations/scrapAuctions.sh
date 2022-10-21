#!/bin/bash
cd ~/exevo-pan/apps/bazaar-scraper/
yarn scrap:auctions

yarn revalidate
yarn revalidate highlight-auction