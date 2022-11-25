import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { URLSearchParams } from 'url'
import { filterCharacters, applySort, paginateData } from 'auction-queries'
import {
  deserializeFilter,
  deserializePagination,
  deserializeSort,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { auctions } from './Data/auctions'
import { filterOldAuctions } from './utils'

export const filterCurrentAuctions = async ({
  httpMethod,
  queryStringParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (httpMethod !== 'GET') {
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

  const currentParams = new URLSearchParams(
    (queryStringParameters as Record<string, string> | null) ?? {},
  )

  const filterOptions = deserializeFilter({ currentParams })
  const sortOptions = deserializeSort({ currentParams })
  const paginationOptions = deserializePagination({ currentParams })

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
