import express from 'express'
import cors from 'cors'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { applySort, filterCharacters, paginateData } from 'auction-queries'
import { broadcast, coloredText } from 'logging'
import { loadAuctions } from './Data/historyAuctions'
import { revalidate } from './revalidate'
import { exposeLocalhost } from './localtunnel'

const { PORT, STAGING } = process.env

const main = async () => {
  const auctions = await loadAuctions()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.post('/', async (request, response) => {
    const { paginationOptions, sortOptions, filterOptions } = deserializeBody(
      request.body,
    )

    const sortedAuctions = applySort(auctions, sortOptions)

    const filteredAuctions = filterCharacters({
      auctions: sortedAuctions,
      filters: filterOptions,
    })

    const paginatedData = paginateData(filteredAuctions, paginationOptions)

    const responseBody = {
      ...paginatedData,
      ...sortOptions,
    }

    broadcast('Server hit', 'success')
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
