/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import fetch from 'node-fetch'
import fs from 'fs'
import readline from 'readline'
import {
  AuctionList,
  AuctionPage,
  KillStatistics,
  PostData,
  ServerList,
} from 'Helpers'
import { BossStatistics } from 'Data'
import History from 'Data/History'
import Server from 'Data/Server'
import RawBazaar from 'Data/RawBazaar'
import { file } from 'Constants'
import cheerio, { CheerioAPI } from 'cheerio/lib/index'
import { HttpClient } from 'services'
import RawHttpClient from 'services/httpClient/rawClient'
import { MemoryWatcher, retryWrapper, runMockedRequests } from 'utils'
import ScrapCurrentAuctions from 'Scripts/UpdateAuctions'
import ScrapServers from 'Scripts/ScrapServers'
import ScrapRareItems from 'Scripts/ScrapRareItems'
import ScrapHistory from 'Scripts/ScrapHistory'
import UpdateHistoryStatistics from 'Scripts/UpdateHistoryStatistics'
import {
  broadcast,
  coloredText,
  log,
  tabBroadcast,
  Timer,
  TrackETA,
} from 'logging'
import { performance } from 'perf_hooks'
import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import { vocation as vocationUtil } from 'data-dictionary/dist/dictionaries/vocations'
import { tokens as mountTokens } from 'data-dictionary/dist/dictionaries/storeMount'
import { tokens as outfitTokens } from 'data-dictionary/dist/dictionaries/storeOutfit'
import { readJsonl, writeJsonl } from 'shared-utils/dist/jsonl'
import crypto from 'crypto'
import { fetchAuctionPage } from 'Scripts/ScrapRawBazaarData/utils'
import { getDateRelativeToSS, stripTime } from 'shared-utils/dist/time'
import {
  constTokens as bossDictionary,
  TrackedBossName,
} from 'data-dictionary/dist/dictionaries/bosses'
import serverJsonData from '../Output/ServerData.json'

const DETAIL_BLOCK_IDS = {
  general: 'General',
  itemSummary: 'ItemSummary',
  storeItemSummary: 'StoreItemSummary',
  mounts: 'Mounts',
  storeMounts: 'StoreMounts',
  outfits: 'Outfits',
  storeOutfits: 'StoreOutfits',
  familiars: 'Familiars',
  blessings: 'Blessings',
  imbuements: 'Imbuements',
  charms: 'Charms',
  cyclopediaAreas: 'CompletedCyclopediaMapAreas',
  quests: 'CompletedQuestLines',
  titles: 'Titles',
  achievements: 'Achievements',
  bestiary: 'BestiaryProgress',
  bosstiary: 'BosstiaryProgress',
  gems: 'RevealedGems',
}

const exploreRaw = async () => {
  const INITIAL_AUCTION_ID = 0
  const FINAL_AUCTION_ID = 1622129

  // these are only necessary for nice logs
  const timer = new Timer()
  const eta = new TrackETA(
    FINAL_AUCTION_ID - INITIAL_AUCTION_ID,
    coloredText('Scraping from local raw HTML data', 'highlight'),
  )

  const scraper = new AuctionPage()
  const postHelper = new PostData()

  // this is only necessary if you need to work with the same server ids that Exevo Pan uses internally
  // await scraper.loadServerData()

  const bag: any[] = []

  for (
    let auctionId = INITIAL_AUCTION_ID;
    auctionId <= FINAL_AUCTION_ID;
    auctionId++
  ) {
    eta.incTask()
    broadcast(`Scraping auction page ${eta.getProgress()}`, 'neutral')
    const content = await RawHttpClient.getAuctionHtml(auctionId)
    if (!content) continue

    const $ = cheerio.load(content)

    // scraping regular data:
    const achievements = scraper.allAchievements($)

    // scraping paged data:
    const lastIndex = scraper.boxSectionLastIndex(DETAIL_BLOCK_IDS.mounts, $)

    let mounts = scraper.mountFirstPage($) // the first page is already present in the html

    for (let pageIndex = 2; pageIndex <= lastIndex; pageIndex += 1) {
      const html = await RawHttpClient.postHtml({
        auctionId,
        pageIndex,
        type: 'mounts',
      })

      mounts = [...mounts, ...postHelper.mounts(html)]
    }

    bag.push({ achievements, mounts })
  }

  eta.finish()
  broadcast(`Script finished in ${timer.elapsedTime()}`, 'success')

  console.log(bag)
}

exploreRaw()
