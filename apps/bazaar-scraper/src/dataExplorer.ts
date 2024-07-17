/* eslint-disable no-restricted-syntax */
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
import { broadcast, coloredText, log, tabBroadcast, TrackETA } from 'logging'
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

function auctionIdToUrl(id: number) {
  return `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}&source=overview`
}

const main = async () => {
  const scraper = new AuctionPage()

  // this is only necessary if you need to work with the same server ids that Exevo Pan uses internally
  // await scraper.loadServerData()

  const ID = 1622126
  const content = await RawHttpClient.tryGetHtml(auctionIdToUrl(ID))
  if (content) {
    const $ = cheerio.load(content)
    console.log(scraper.allAchievements($))
  }

  //
  // const html = await HttpClient.getHtml(buildUrl(1612177))
  // const result = await helper2.partialCharacterObject(html)
  // console.log(result)

  // const helper = new History()
  // await helper.load()
}

main()
