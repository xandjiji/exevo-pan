import { HighlightedAuctions } from 'Data'
import { broadcast, coloredText } from 'logging'
import { fetchHighlightedIds, buildHighlightedAuctions } from './tasks'

const SCRIPT_NAME = coloredText('GetHighlightedAuctions', 'highlight')

const main = async (): Promise<void> => {
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const highlightedIds = await fetchHighlightedIds()
  const characterObjects = await buildHighlightedAuctions(highlightedIds)

  const highlightedAuctionsData = new HighlightedAuctions()
  highlightedAuctionsData.setHighlightedAuctions(characterObjects)
  await highlightedAuctionsData.save()

  broadcast(`${SCRIPT_NAME} script routine finished`, 'success')
}

export default main
