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

export const fetchHighlightedIds = async (): Promise<number[]> => {
  broadcast(`Fetching highlighted auction data...`, 'neutral')
  const dirtyData = await fetchData()
  const parsedData: HighlightedAuctionData[] = dirtyData.map(({ metadata }) =>
    JSON.parse(metadata),
  )

  const currentDate = currentStringDate()

  const activeHighlightedIds = parsedData
    .filter(({ days, active }) => days.includes(currentDate) && active)
    .map(({ id }) => id)

  const idSet = new Set<number>(activeHighlightedIds)
  return [...idSet]
}
