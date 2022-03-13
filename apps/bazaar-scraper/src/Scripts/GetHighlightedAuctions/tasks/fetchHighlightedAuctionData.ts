import { HttpClient } from 'services'
import { broadcast } from 'logging'
import { retryWrapper } from 'utils'
import { currentStringDate } from '../utils'

const DATA_ENDPOINT = 'https://backoffice.exevopan.workers.dev'

type RawHighlightedData = {
  name: string
  expiration: number
  metadata: string
}

const fetchData = retryWrapper(async () =>
  HttpClient.getJSON<RawHighlightedData[]>(`${DATA_ENDPOINT}/api`),
)

const MILLISECONDS_IN_15_MINUTES = 900000

export const fetchHighlightedIds = async (): Promise<number[]> => {
  broadcast(`Fetching highlighted auction data...`, 'neutral')
  const dirtyData = await fetchData()
  const parsedData: HighlightedAuctionData[] = dirtyData.map(({ metadata }) =>
    JSON.parse(metadata),
  )

  const currentTimestamp = +new Date()

  const currentDate = currentStringDate()

  const activeHighlightedIds = parsedData
    .filter(({ days }) => days.includes(currentDate))
    .filter(({ active }) => active)
    .filter(
      ({ timestamp }) =>
        currentTimestamp - timestamp >= MILLISECONDS_IN_15_MINUTES,
    )
    .map(({ id }) => id)

  const idSet = new Set<number>(activeHighlightedIds)
  return [...idSet]
}
