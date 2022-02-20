import express from 'express'
import cors from 'cors'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { paginateData } from 'auction-queries'
import { broadcast, coloredText } from 'logging'
import { currentAuctions, historyAuctions } from './Data'
import { applySort, filterCharacters } from './cachedWrapper'

const { PORT, MODE } = process.env
const isHistory = () => MODE === 'history'

const main = async () => {
  const auctions = isHistory()
    ? await historyAuctions()
    : await currentAuctions()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.post('/', async (request, response) => {
    const { paginationOptions, sortOptions, filterOptions } = deserializeBody(
      request.body,
    )

    const sortedAuctions = applySort(auctions, sortOptions)

    const filteredAuctions = filterCharacters({
      sortOptions,
      serializedFilterOptions: request.body.filterOptions,
      auctions: sortedAuctions,
      filters: filterOptions,
    })

    const paginatedData = paginateData(filteredAuctions, paginationOptions)

    const responseBody = {
      ...paginatedData,
      ...sortOptions,
    }

    response.json(responseBody)
  })

  app.listen(PORT, () => {
    broadcast(
      `${coloredText(
        isHistory() ? 'History Server' : 'Current Auctions Server',
        'highlight',
      )} is running at http://localhost:${PORT}`,
      'success',
    )
  })
}

main()
