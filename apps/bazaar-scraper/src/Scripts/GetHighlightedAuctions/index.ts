import { HighlightedAuctions } from 'Data'
import { broadcast, coloredText } from 'logging'
import { fetchHighlightedAuctionData, buildHighlightedAuctions } from './tasks'

const SCRIPT_NAME = coloredText('GetHighlightedAuctions', 'highlight')

const main = async (): Promise<void> => {
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const highlightedData = await fetchHighlightedAuctionData()
  const characterObjects = await buildHighlightedAuctions(highlightedData)

  const highlightedAuctionsData = new HighlightedAuctions()
  highlightedAuctionsData.setHighlightedAuctions(characterObjects)
  await highlightedAuctionsData.save()

  broadcast(`${SCRIPT_NAME} script routine finished`, 'success')
}

export default main
