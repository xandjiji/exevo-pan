/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import {} from 'shared-utils/dist/contracts/Filters/defaults'
import { prisma } from 'services/prisma'
import { deserializeUrlParams } from 'hooks/useUrlParamsState/utils'
import { schema as filtersSchema } from 'modules/BazaarAuctions/contexts/useFilters/schema'
import { schema as auctionsSchema } from 'modules/BazaarAuctions/contexts/useAuctions/schema'

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, url } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)

    return
  }

  const [, searchParams] = (url ?? '')?.split('?')
  const currentParams = new URLSearchParams(searchParams)

  const filterOptions = deserializeUrlParams({
    schema: filtersSchema,
    currentParams,
  })

  const sortOptions = deserializeUrlParams({
    schema: auctionsSchema.buildSortingSchema(),
    currentParams,
  })

  console.log(filterOptions)

  try {
    response.status(200).json({})
    return
  } catch (error) {
    response.status(400).json({ error })
  }
}
