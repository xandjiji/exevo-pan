/* eslint-disable no-await-in-loop */
import cheerio, { CheerioAPI } from 'cheerio/lib/index'
import { AuctionPage, PostData } from 'Helpers'
import { HttpClient } from 'services'
import { coloredText, tabBroadcast } from 'logging'
import { retryWrapper, sleep } from 'utils'
import { PostHtmlProps } from 'services/httpClient/types'
import { CharacterPostData, readableTypes } from './types'

const logRequest = ({ auctionId, pageIndex, type }: PostHtmlProps): void =>
  tabBroadcast(
    `Requesting ${coloredText(
      readableTypes[type],
      'control',
    )} data page ${coloredText(
      pageIndex,
      'highlight',
    )} for auction id ${coloredText(auctionId, 'highlight')}`,
    'neutral',
  )

const getPostData = retryWrapper((args: PostHtmlProps) => {
  logRequest(args)
  return HttpClient.postHtml(args)
})

export const getPagedData = async (
  $: CheerioAPI,
  { requestDelay }: { requestDelay: number },
): Promise<CharacterPostData> => {
  const helper = new AuctionPage()
  const postHelper = new PostData()

  const auctionId = helper.id($)

  const lastIndexes = {
    storeItems: helper.boxSectionLastIndex('StoreItemSummary', $),
    mounts: helper.boxSectionLastIndex('Mounts', $),
    storeMounts: helper.boxSectionLastIndex('StoreMounts', $),
    outfits: helper.boxSectionLastIndex('Outfits', $),
    storeOutfits: helper.boxSectionLastIndex('StoreOutfits', $),
  }

  if (requestDelay) await sleep(requestDelay)

  let storeItems: CharacterItem[] = helper.storeFirstPage($)
  for (let pageIndex = 2; pageIndex <= lastIndexes.storeItems; pageIndex += 1) {
    if (requestDelay) await sleep(requestDelay)
    const html = await getPostData({
      auctionId,
      pageIndex,
      type: 'storeItems',
    })
    storeItems = [...storeItems, ...postHelper.items(html)]
  }

  let outfits: Outfit[] = helper.outfitFirstPage($)
  for (let pageIndex = 2; pageIndex <= lastIndexes.outfits; pageIndex += 1) {
    if (requestDelay) await sleep(requestDelay)
    const html = await getPostData({
      auctionId,
      pageIndex,
      type: 'outfits',
    })
    outfits = [...outfits, ...postHelper.outfits(html)]
  }

  let storeOutfits: Outfit[] = helper.storeOutfitFirstPage($)
  for (
    let pageIndex = 2;
    pageIndex <= lastIndexes.storeOutfits;
    pageIndex += 1
  ) {
    if (requestDelay) await sleep(requestDelay)
    const html = await getPostData({
      auctionId,
      pageIndex,
      type: 'storeOutfits',
    })
    storeOutfits = [...storeOutfits, ...postHelper.outfits(html)]
  }

  let mounts: string[] = helper.mountFirstPage($)
  for (let pageIndex = 2; pageIndex <= lastIndexes.mounts; pageIndex += 1) {
    if (requestDelay) await sleep(requestDelay)
    const html = await getPostData({
      auctionId,
      pageIndex,
      type: 'mounts',
    })
    mounts = [...mounts, ...postHelper.mounts(html)]
  }

  let storeMounts: string[] = helper.storeMountFirstPage($)
  for (
    let pageIndex = 2;
    pageIndex <= lastIndexes.storeMounts;
    pageIndex += 1
  ) {
    if (requestDelay) await sleep(requestDelay)
    const html = await getPostData({
      auctionId,
      pageIndex,
      type: 'storeMounts',
    })
    storeMounts = [...storeMounts, ...postHelper.mounts(html)]
  }

  return {
    storeItems,
    outfits,
    storeOutfits,
    mounts,
    storeMounts,
  }
}

export const getPageableAuctionData = async (
  auctionId: number,
  $: CheerioAPI,
  { requestDelay }: { requestDelay: number },
): Promise<PageableAuctionData> => {
  const helper = new AuctionPage()

  const lastIndexes = {
    storeItems: helper.boxSectionLastIndex('StoreItemSummary', $),
    mounts: helper.boxSectionLastIndex('Mounts', $),
    storeMounts: helper.boxSectionLastIndex('StoreMounts', $),
    outfits: helper.boxSectionLastIndex('Outfits', $),
    storeOutfits: helper.boxSectionLastIndex('StoreOutfits', $),
  }

  const pageableAuctionData: PageableAuctionData = {
    storeItems: [],
    mounts: [],
    storeMounts: [],
    outfits: [],
    storeOutfits: [],
  }

  if (requestDelay) await sleep(requestDelay)

  for (let pageIndex = 2; pageIndex <= lastIndexes.storeItems; pageIndex += 1) {
    if (requestDelay) await sleep(requestDelay)
    pageableAuctionData.storeItems.push(
      await getPostData({
        auctionId,
        pageIndex,
        type: 'storeItems',
      }),
    )
  }

  for (let pageIndex = 2; pageIndex <= lastIndexes.outfits; pageIndex += 1) {
    if (requestDelay) await sleep(requestDelay)
    pageableAuctionData.outfits.push(
      await getPostData({
        auctionId,
        pageIndex,
        type: 'outfits',
      }),
    )
  }

  for (
    let pageIndex = 2;
    pageIndex <= lastIndexes.storeOutfits;
    pageIndex += 1
  ) {
    if (requestDelay) await sleep(requestDelay)
    pageableAuctionData.storeOutfits.push(
      await getPostData({
        auctionId,
        pageIndex,
        type: 'storeOutfits',
      }),
    )
  }

  for (let pageIndex = 2; pageIndex <= lastIndexes.mounts; pageIndex += 1) {
    if (requestDelay) await sleep(requestDelay)
    pageableAuctionData.mounts.push(
      await getPostData({
        auctionId,
        pageIndex,
        type: 'mounts',
      }),
    )
  }

  for (
    let pageIndex = 2;
    pageIndex <= lastIndexes.storeMounts;
    pageIndex += 1
  ) {
    if (requestDelay) await sleep(requestDelay)
    pageableAuctionData.storeMounts.push(
      await getPostData({
        auctionId,
        pageIndex,
        type: 'storeMounts',
      }),
    )
  }

  return pageableAuctionData
}

export const loadCheerio = (content: CheerioAPI | string): CheerioAPI => {
  if (typeof content === 'string') {
    return cheerio.load(content)
  }
  return content
}

const numberRegex = /\d+/g
export const findNumber = (text: string): number => {
  const [number] = text.match(numberRegex) ?? [-1]

  return +number
}
