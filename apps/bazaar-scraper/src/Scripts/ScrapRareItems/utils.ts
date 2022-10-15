import { AuctionList } from 'Helpers'
import { HttpClient, prisma } from 'services'
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

type UpsertRareItem = {
  name: string
  id: number
}

export const db = {
  upsertRareItem: retryWrapper(({ name, id }: UpsertRareItem) =>
    prisma.rareItem.upsert({
      where: { name_currentAuctionId: { name, currentAuctionId: id } },
      update: {
        name,
        auction: { connect: { id } },
      },
      create: {
        name,
        auction: { connect: { id } },
      },
    }),
  ),
  upsertCurrentRareItemNames: retryWrapper((itemNames: string[]) =>
    prisma.$transaction([
      prisma.currentRareItems.deleteMany(),
      prisma.currentRareItems.createMany({
        data: itemNames.map((name) => ({ name })),
      }),
    ]),
  ),
}
