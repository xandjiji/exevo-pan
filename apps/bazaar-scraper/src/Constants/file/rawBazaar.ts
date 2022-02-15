import { FileConstant, OUTPUT_PATH } from './types'

const filenames = {
  SCRAP_DATA: 'ScrapRawData.json',
}

export const SCRAP_RAW_DATA: FileConstant = {
  name: filenames.SCRAP_DATA,
  path: `${OUTPUT_PATH}/${filenames.SCRAP_DATA}`,
}
