import { HttpClient } from 'services'
import { broadcast } from 'logging'
import { retryWrapper } from 'utils'
import { currentStringDate, normalizeAuctionDates } from '../utils'

const DATA_ENDPOINT = 'https://exevo-pan-highlighted.netlify.app'

const fetchData = retryWrapper(async () =>
  HttpClient.getJSON<HighlightedAuctionData[]>(
    `${DATA_ENDPOINT}/highlighted.json`,
  ),
)

export const fetchHighlightedAuctionData = async (): Promise<
  HighlightedAuctionData[]
> => {
  broadcast(`Fetching highlighted auction data...`, 'neutral')
  const dirtyData = await fetchData()

  const currentDate = currentStringDate()

  return normalizeAuctionDates(dirtyData).filter(({ days }) =>
    days.includes(currentDate),
  )
}
