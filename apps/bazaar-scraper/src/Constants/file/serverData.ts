import { FileConstant, OUTPUT_PATH } from './types'

const FILENAME = 'ServerData.json'

export const SERVER_DATA: FileConstant = {
  name: FILENAME,
  path: `${OUTPUT_PATH}/${FILENAME}`,
}
