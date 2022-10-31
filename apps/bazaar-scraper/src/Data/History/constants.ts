import { OUTPUT_PATH } from 'Constants/file/types'

const filenames = {
  AUCTIONS: 'HistoryAuctions.jsonl',
  SCRAP_DATA: 'ScrapHistoryData.json',
}

export const HISTORY_AUCTIONS = {
  name: filenames.AUCTIONS,
  path: `${OUTPUT_PATH}/${filenames.AUCTIONS}`,
}

export const SCRAP_HISTORY_DATA = {
  name: filenames.SCRAP_DATA,
  path: `${OUTPUT_PATH}/${filenames.SCRAP_DATA}`,
}
