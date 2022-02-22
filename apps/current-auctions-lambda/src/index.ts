import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { applySort, paginateData } from 'auction-queries'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { auctions } from './Data/auctions'
import { filterOldAuctions } from './utils'
import { filterCharacters } from './filterWrapper'

export const filterCurrentAuctions = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const currentAuctions = filterOldAuctions(auctions, +new Date() / 1000)

  const serializedBody: SerializedFilterBody = JSON.parse(event.body ?? '')
  const { filterOptions, sortOptions, paginationOptions } =
    deserializeBody(serializedBody)

  const filteredAuctions = filterCharacters({
    auctions: currentAuctions,
    filters: filterOptions,
  })

  const sortedAuctions = applySort(filteredAuctions, sortOptions)

  const paginatedData = paginateData(sortedAuctions, paginationOptions)

  const responseBody = {
    ...paginatedData,
    ...sortOptions,
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(responseBody),
  }
}
