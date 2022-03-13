import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { applySort, paginateData } from 'auction-queries'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { auctions } from './Data/auctions'
import { filterOldAuctions } from './utils'
import { filterCharacters } from './filterWrapper'

export const filterCurrentAuctions = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'empty body' }),
    }
  }

  const currentAuctions = filterOldAuctions(auctions)

  const serializedBody: SerializedFilterBody = JSON.parse(event.body as string)
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
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(responseBody),
  }
}
