import { FileConstant, OUTPUT_PATH } from './types'

const FILENAME = 'CurrentAuctions.json'

export const CURRENT_AUCTIONS: FileConstant = {
  name: FILENAME,
  path: `${OUTPUT_PATH}/${FILENAME}`,
}
