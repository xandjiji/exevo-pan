/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import { inspect } from 'util'
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

const BASE_AUCTION_FEE = 50
const AUCTION_TAX = 0.12
const START_YEAR = 2020
const TARGET_YEAR = 2025
const TOP_INVESTED_LIMIT = 20
const YEAR_RANGE = Array.from(
  { length: TARGET_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index,
)
const REGION_LABELS: Record<string, string> = {
  BR: 'South America',
  NA: 'North America',
  EU: 'Europe',
  OCE: 'Oceania',
}
const PVP_TYPE_LABELS: Record<string, string> = {
  Optional: 'Optional',
  Open: 'Open',
  'Retro Open': 'Retro',
  Hardcore: 'Hardcore',
  'Retro Hardcore': 'Retro Hardcore',
}
const MAILBOX_NAMES = new Set(['mailbox', 'ornate mailbox'])
const IMBUEMENT_SHRINE_NAMES = new Set([
  'imbuing shrine',
  'gilded imbuing shrine',
])
const REWARD_SHRINE_NAMES = new Set(['reward shrine', 'shiny reward shrine'])

const serverRegionById = Object.values(serverJsonData).reduce<
  Record<number, string>
>((acc, server) => {
  acc[server.serverId] = server.serverLocation.string
  return acc
}, {})
const serverPvpTypeById = Object.values(serverJsonData).reduce<
  Record<number, string>
>((acc, server) => {
  acc[server.serverId] = server.pvpType.string
  return acc
}, {})

function getServerDataByIdx(idx: number) {
  const list = Object.values(serverJsonData)

  return list.find((s) => s.serverId === idx)!
}

const getCipsoftProfit = ({
  hasBeenBidded,
  currentBid,
}: Pick<PartialCharacterObject, 'hasBeenBidded' | 'currentBid'>): number => {
  let profit = BASE_AUCTION_FEE

  if (hasBeenBidded) {
    profit += Math.floor((currentBid - BASE_AUCTION_FEE) * AUCTION_TAX)
  }

  return profit
}

const isAuctionFromYear = (auctionEnd: number, year: number): boolean =>
  new Date(auctionEnd * 1000).getUTCFullYear() === year

const toPercentage = (value: number, total: number): number =>
  Number(((value / total) * 100 || 0).toFixed(2))

const toRoundedValue = (value: number): number => Number(value.toFixed(2))

const getAverage = (values: number[]): number =>
  toRoundedValue(
    values.reduce((sum, value) => sum + value, 0) / values.length || 0,
  )

const getMedian = (values: number[]): number => {
  if (values.length === 0) return 0

  const sorted = [...values].sort((a, b) => a - b)
  const middleIndex = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return toRoundedValue((sorted[middleIndex - 1] + sorted[middleIndex]) / 2)
  }

  return sorted[middleIndex]
}

const getTcInvestedStats = (
  auctions: PartialCharacterObject[],
): {
  auctionCount: number
  averageTcInvested: number
  medianTcInvested: number
} => {
  const values = auctions.map(({ tcInvested }) => tcInvested)

  return {
    auctionCount: auctions.length,
    averageTcInvested: getAverage(values),
    medianTcInvested: getMedian(values),
  }
}

const getYearlyAuctionStats = (auctions: PartialCharacterObject[]) =>
  YEAR_RANGE.map((year) => {
    const yearlyAuctions = auctions.filter(({ auctionEnd }) =>
      isAuctionFromYear(auctionEnd, year),
    )
    const biddedYearlyAuctions = yearlyAuctions.filter(
      ({ hasBeenBidded }) => hasBeenBidded,
    )

    return {
      year,
      auctionCount: yearlyAuctions.length,
      biddedAuctionCount: biddedYearlyAuctions.length,
      averageFinalBid: getAverage(
        biddedYearlyAuctions.map(({ currentBid }) => currentBid),
      ),
    }
  })

const PURCHASE_FEATURES = [
  {
    feature: 'Hirelings',
    predicate: ({ hirelings }: PartialCharacterObject) => hirelings.count > 0,
  },
  {
    feature: 'Gold Pouch',
    predicate: ({ storeItems }: PartialCharacterObject) =>
      storeItems.some(({ name }) => name === 'gold pouch'),
  },
  {
    feature: 'Training Dummy',
    predicate: ({ storeItems }: PartialCharacterObject) =>
      storeItems.some(({ name }) => name.includes('exercise dummy')),
  },
  {
    feature: 'Charm Expansion',
    predicate: ({ charmInfo }: PartialCharacterObject) => charmInfo.expansion,
  },
  {
    feature: 'Imbuement Shrine',
    predicate: ({ storeItems }: PartialCharacterObject) =>
      storeItems.some(({ name }) => IMBUEMENT_SHRINE_NAMES.has(name)),
  },
  {
    feature: 'Reward Shrine',
    predicate: ({ storeItems }: PartialCharacterObject) =>
      storeItems.some(({ name }) => REWARD_SHRINE_NAMES.has(name)),
  },
  {
    feature: 'Prey Slot',
    predicate: ({ preySlot }: PartialCharacterObject) => preySlot,
  },
  {
    feature: 'Hunting Task',
    predicate: ({ huntingSlot }: PartialCharacterObject) => huntingSlot,
  },
  {
    feature: 'Mailbox',
    predicate: ({ storeItems }: PartialCharacterObject) =>
      storeItems.some(({ name }) => MAILBOX_NAMES.has(name)),
  },
]

const getPurchaseFeatureStats = (auctions: PartialCharacterObject[]) => {
  const relevantAuctions = auctions.filter((auction) =>
    PURCHASE_FEATURES.some(({ predicate }) => predicate(auction)),
  )

  return {
    consideredAuctions: relevantAuctions.length,
    breakdown: PURCHASE_FEATURES.map(({ feature, predicate }) => {
      const matchingCount = relevantAuctions.filter(predicate).length

      return {
        feature,
        auctionCount: matchingCount,
        percentage: toPercentage(matchingCount, relevantAuctions.length),
      }
    }),
  }
}

const getOccurrenceCounts = (names: string[]) => {
  const countByName = new Map<string, number>()

  names.forEach((name) => {
    countByName.set(name, (countByName.get(name) ?? 0) + 1)
  })

  return [...countByName.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

const addPercentageToOccurrenceCounts = (
  occurrenceCounts: { name: string; count: number }[],
  total: number,
) =>
  occurrenceCounts.map(({ name, count }) => ({
    name,
    count,
    percentage: toPercentage(count, total),
  }))

const getLatestAuctionPerCharacter = (
  auctions: PartialCharacterObject[],
): PartialCharacterObject[] => {
  const latestAuctionPerCharacter = new Map<string, PartialCharacterObject>()

  auctions.forEach((auction) => {
    const previousAuction = latestAuctionPerCharacter.get(auction.nickname)

    if (!previousAuction || auction.id > previousAuction.id) {
      latestAuctionPerCharacter.set(auction.nickname, auction)
    }
  })

  return [...latestAuctionPerCharacter.values()]
}

const getLatestAuctionPerTcInvested = (
  auctions: PartialCharacterObject[],
): PartialCharacterObject[] => {
  const latestAuctionPerTcInvested = new Map<number, PartialCharacterObject>()

  auctions.forEach((auction) => {
    const previousAuction = latestAuctionPerTcInvested.get(auction.tcInvested)

    if (!previousAuction || auction.id > previousAuction.id) {
      latestAuctionPerTcInvested.set(auction.tcInvested, auction)
    }
  })

  return [...latestAuctionPerTcInvested.values()]
}

const exploreAuctionHistory = async () => {
  const history = new History()
  await history.load()

  const auctions = history.getEntireHistory()

  const filteredAuctions: typeof auctions = []
  const characterNameSet = new Set<string>([])

  for (let i = auctions.length - 1; i >= 0; i--) {
    const auction = auctions[i]

    if (!characterNameSet.has(auction.nickname)) {
      characterNameSet.add(auction.nickname)
      filteredAuctions.push(auction)
    }
  }

  const uniqueCharacters = getLatestAuctionPerCharacter(auctions)
  const top20MostInvested = [...uniqueCharacters]
    .sort((a, b) => b.tcInvested - a.tcInvested || b.id - a.id)
    .slice(0, TOP_INVESTED_LIMIT + 1)
    .map((data) => ({ ...data, serverData: getServerDataByIdx(data.serverId) }))
    .filter((a) => a.nickname !== 'Gbe allmounts outfitscharms')
  const uniqueTcInvestedAuctions = getLatestAuctionPerTcInvested(
    auctions.filter(({ hasBeenBidded }) => hasBeenBidded),
  )
  const uniqueNickAndTcInvestedAuctions = getLatestAuctionPerCharacter(
    uniqueTcInvestedAuctions,
  )
  const top20BuyerAdvantage = uniqueNickAndTcInvestedAuctions
    .sort(
      (a, b) =>
        b.tcInvested - b.currentBid - (a.tcInvested - a.currentBid) ||
        b.id - a.id,
    )
    .slice(0, TOP_INVESTED_LIMIT)
    .map(
      ({ id, nickname, tcInvested, currentBid, level, serverId }, index) => ({
        rank: index + 1,
        id,
        nickname,
        tcInvested,
        currentBid,
        advantage: tcInvested - currentBid,
        level,
        serverId,
      }),
    )
  const auctions2025 = filteredAuctions.filter(({ auctionEnd }) =>
    isAuctionFromYear(auctionEnd, TARGET_YEAR),
  )
  const zeroTcInvestedAuctions2025 = auctions2025.filter(
    ({ tcInvested }) => tcInvested === 0,
  )
  const zeroTcInvested2025Stats = {
    totalAuctions: auctions2025.length,
    zeroTcInvestedAuctions: zeroTcInvestedAuctions2025.length,
    percentage: toPercentage(
      zeroTcInvestedAuctions2025.length,
      auctions2025.length,
    ),
  }
  const zeroTcInvested2025ByRegion = Object.entries(REGION_LABELS).map(
    ([regionCode, region]) => {
      const regionAuctions = auctions2025.filter(
        ({ serverId }) => serverRegionById[serverId] === regionCode,
      )
      const zeroTcInvestedAuctions = regionAuctions.filter(
        ({ tcInvested }) => tcInvested === 0,
      )

      return {
        region,
        totalAuctions: regionAuctions.length,
        zeroTcInvestedAuctions: zeroTcInvestedAuctions.length,
        percentage: toPercentage(
          zeroTcInvestedAuctions.length,
          regionAuctions.length,
        ),
      }
    },
  )
  const tcInvested2025ByRegion = Object.entries(REGION_LABELS).map(
    ([regionCode, region]) => ({
      region,
      ...getTcInvestedStats(
        auctions2025.filter(
          ({ tcInvested, serverId }) =>
            tcInvested > 0 && serverRegionById[serverId] === regionCode,
        ),
      ),
    }),
  )
  const tcInvested2025ByPvpType = Object.entries(PVP_TYPE_LABELS).map(
    ([pvpTypeCode, pvpType]) => ({
      pvpType,
      ...getTcInvestedStats(
        auctions2025.filter(
          ({ tcInvested, serverId }) =>
            tcInvested > 0 && serverPvpTypeById[serverId] === pvpTypeCode,
        ),
      ),
    }),
  )
  const purchaseFeatureStats = getPurchaseFeatureStats(auctions2025)
  const yearlyAuctionStats = getYearlyAuctionStats(auctions)

  let totalTCVolume = 0
  let totalCipsoftProfit = 0
  let totalTCVolume2025 = 0
  let totalCipsoftProfit2025 = 0
  const tcInvestedTotal = 0

  let outfitBuyer = 0
  let mountBuyer = 0
  let outfitBuyer2025 = 0
  let mountBuyer2025 = 0

  const storeMountOccurrenceCounts = getOccurrenceCounts(
    filteredAuctions.flatMap(({ storeMounts }) => storeMounts),
  )
  const storeOutfitOccurrenceCounts = getOccurrenceCounts(
    filteredAuctions.flatMap(({ storeOutfits }) =>
      storeOutfits.map(({ name }) => name),
    ),
  )

  const storeOutfitOccurrenceCounts2025 = getOccurrenceCounts(
    auctions2025.flatMap(({ storeOutfits }) =>
      storeOutfits.map(({ name }) => name),
    ),
  )
  const storeMountOccurrenceCounts2025 = getOccurrenceCounts(
    auctions2025.flatMap(({ storeMounts }) => storeMounts),
  )

  for (const auction of filteredAuctions) {
    const cipsoftProfit = getCipsoftProfit(auction)
    const isFrom2025 = isAuctionFromYear(auction.auctionEnd, TARGET_YEAR)

    if (isFrom2025) {
      if (auction.storeOutfits.length) outfitBuyer2025++
      if (auction.storeMounts.length) mountBuyer2025++
    }

    if (auction.storeOutfits.length) outfitBuyer++
    if (auction.storeMounts.length) mountBuyer++

    totalCipsoftProfit += cipsoftProfit
    if (isFrom2025) totalCipsoftProfit2025 += cipsoftProfit

    if (!auction.hasBeenBidded) continue

    totalTCVolume += auction.currentBid
    if (isFrom2025) totalTCVolume2025 += auction.currentBid
  }

  const storeMountOccurrenceCountsWithPercentage =
    addPercentageToOccurrenceCounts(storeMountOccurrenceCounts, mountBuyer)
  const storeOutfitOccurrenceCountsWithPercentage =
    addPercentageToOccurrenceCounts(storeOutfitOccurrenceCounts, outfitBuyer)
  const storeMountOccurrenceCounts2025WithPercentage =
    addPercentageToOccurrenceCounts(
      storeMountOccurrenceCounts2025,
      mountBuyer2025,
    )
  const storeOutfitOccurrenceCounts2025WithPercentage =
    addPercentageToOccurrenceCounts(
      storeOutfitOccurrenceCounts2025,
      outfitBuyer2025,
    )

  // console.log({
  //   totalTCVolume,
  //   totalCipsoftProfit,
  //   totalTCVolume2025,
  //   totalCipsoftProfit2025,
  // })
  // console.log({ zeroTcInvested2025Stats })
  // console.table(zeroTcInvested2025ByRegion)
  // console.table(tcInvested2025ByRegion)
  // console.table(tcInvested2025ByPvpType)
  // console.log({
  //   purchaseFeatureSubsetAuctionCount: purchaseFeatureStats.consideredAuctions,
  // })
  // console.table(purchaseFeatureStats.breakdown)
  // console.table(top20BuyerAdvantage)
  //
  // console.log('store occurences')
  // console.table(storeMountOccurrenceCountsWithPercentage)
  // console.table(storeOutfitOccurrenceCountsWithPercentage)

  // console.log('store occurences2025')
  // console.table(storeMountOccurrenceCounts2025WithPercentage)
  // console.table(storeOutfitOccurrenceCounts2025WithPercentage)
  //
  // console.table(yearlyAuctionStats)
  // fs.writeFileSync('topinvest.json', JSON.stringify(top20MostInvested))
  // console.log(
  //   inspect(top20MostInvested, {
  //     showHidden: false,
  //     depth: null,
  //     colors: true,
  //   }),
  // )
  console.log({
    outfitBuyer: outfitBuyer / characterNameSet.size,
    mountBuyer: mountBuyer / characterNameSet.size,
  })
}

// exploreRaw()

exploreAuctionHistory()
