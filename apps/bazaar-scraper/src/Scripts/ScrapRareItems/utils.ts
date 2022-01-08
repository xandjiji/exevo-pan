import { AuctionList } from 'Helpers'
import { HttpClient } from 'services'
import { retryWrapper } from 'utils'

const BASE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades'

export const buildItemPageUrl = (itemName: string, index: number): string =>
  encodeURI(
    `${BASE_URL}&searchstring=${itemName}&searchtype=2&currentpage=${index}`,
  )

export const fetchItemPage = retryWrapper(
  async (itemName: string, index: number): Promise<RareItemBlock> => {
    const url = buildItemPageUrl(itemName, index)

    const helper = new AuctionList()
    const html = await HttpClient.getHtml(url)

    const lastPageIndex = helper.lastPageIndex(html)
    const ids = helper.auctionBlocks(html).map(({ id }) => id)

    return { name: itemName, lastPageIndex, ids }
  },
)

export const buildRareItemCollection = (
  itemBlocks: RareItemBlock[],
): RareItemBlockCollection => {
  const collection: RareItemBlockCollection = {}

  itemBlocks.forEach((block) => {
    if (block.ids.length) {
      collection[block.name] = block
    }
  })

  return collection
}
