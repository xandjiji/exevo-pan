import { FileConstant, OUTPUT_PATH } from './types'

const filenames = {
  AUCTIONS: 'HistoryAuctions.jsonl',
  SCRAP_DATA: 'ScrapHistoryData.json',
}

export const HISTORY_AUCTIONS: FileConstant = {
  name: filenames.AUCTIONS,
  path: `${OUTPUT_PATH}/${filenames.AUCTIONS}`,
}

export const SCRAP_HISTORY_DATA: FileConstant = {
  name: filenames.SCRAP_DATA,
  path: `${OUTPUT_PATH}/${filenames.SCRAP_DATA}`,
}
