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
import { revalidate } from './revalidate'
import { Timer } from './timer'
import { exposeLocalhost } from './localtunnel'

const { PORT, STAGING } = process.env

const main = async () => {
  const auctions = await loadAuctions()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/', async ({ url }, response) => {
    const timer = new Timer()
    const [, searchParams] = (url ?? '').split('?')
    const currentParams = new URLSearchParams(searchParams)

    const filterOptions = deserializeFilter({ currentParams })
    const sortOptions = deserializeSort.history({ currentParams })
    const paginationOptions = deserializePagination({ currentParams })

    const filteredAuctions = filterCharacters({
      auctions,
      filters: filterOptions,
    })

    const sortedAuctions = applySort(filteredAuctions, sortOptions)

    const paginatedData = paginateData(sortedAuctions, paginationOptions)

    const responseBody = {
      ...paginatedData,
      ...sortOptions,
    }

    broadcast(`${url} ${timer.elapsedTime()}`, 'success')
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

  broadcast(`Revalidating /bazaar-history ...`, 'neutral')
  revalidate()
    .catch(() => broadcast(`Pages could not be revalidated!`, 'fail'))
    .then(() => broadcast(`Pages revalidated!`, 'success'))
  if (STAGING) exposeLocalhost()
}

main()
