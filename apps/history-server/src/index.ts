import express from 'express'
import cors from 'cors'
import {
  deserializeFilter,
  deserializePagination,
  deserializeSort,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { applySort, filterCharacters, paginateData } from 'auction-queries'
import { broadcast, coloredText } from 'logging'
import { loadAuctions } from './Data/historyAuctions'
import { Timer, getMedian, canBeUsedForEstimations } from './utils'
import { exposeLocalhost } from './localtunnel'

const { PORT, STAGING } = process.env

const main = async () => {
  const auctions = await loadAuctions()
  const estimationAuctions = auctions.filter(canBeUsedForEstimations())

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/', async ({ url }, response) => {
    const timer = new Timer()
    const [, searchParams] = (url ?? '').split('?')
    const currentParams = new URLSearchParams(searchParams)

    const filterOptions = deserializeFilter({ currentParams })
    const sortOptions = deserializeSort({ currentParams })
    const paginationOptions = deserializePagination({ currentParams })

    const filteredAuctions = filterCharacters({
      auctions,
      filters: filterOptions,
    })

    const sortedAuctions = applySort(filteredAuctions, sortOptions)
    const paginatedData = paginateData(sortedAuctions, paginationOptions)

    const responseBody: FilterResponse = {
      ...paginatedData,
      ...sortOptions,
    }

    broadcast(`${timer.elapsedTime()} ${url}`, 'success')
    response.json(responseBody)
  })

  app.get('/estimate', async ({ url }, response) => {
    const timer = new Timer()
    const [, searchParams] = (url ?? '').split('?')
    const currentParams = new URLSearchParams(searchParams)

    const filterOptions = deserializeFilter({ currentParams })
    const sortOptions = deserializeSort({ currentParams })
    const paginationOptions = deserializePagination({ currentParams })

    const filteredAuctions = filterCharacters({
      auctions: estimationAuctions,
      filters: filterOptions,
    })

    const estimatedValue = getMedian(
      filteredAuctions.map(({ currentBid }) => currentBid),
    )

    const sortedAuctions = applySort(filteredAuctions, sortOptions)
    const paginatedData = paginateData(sortedAuctions, paginationOptions)

    const responseBody: EstimatedValueResponse = {
      ...paginatedData,
      ...sortOptions,
      estimatedValue,
    }

    broadcast(`${timer.elapsedTime()} ${url}`, 'success')
    response.json(responseBody)
  })

  app.listen(PORT, () => {
    broadcast(
      `${coloredText(
        'History Server',
        'highlight',
      )} is running at http://localhost:${PORT}`,
      'success',
    )
  })

  if (STAGING) exposeLocalhost()
}

main()
