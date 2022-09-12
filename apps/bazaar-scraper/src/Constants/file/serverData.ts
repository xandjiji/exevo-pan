import { FileConstant, OUTPUT_PATH } from './types'

const SERVER_DATA_FILENAME = 'ServerData.json'

export const SERVER_DATA: FileConstant = {
  name: SERVER_DATA_FILENAME,
  path: `${OUTPUT_PATH}/${SERVER_DATA_FILENAME}`,
}

const ACTIVE_SERVERS_FILENAME = 'ActiveServers.json'

export const ACTIVE_SERVERS: FileConstant = {
  name: ACTIVE_SERVERS_FILENAME,
  path: `${OUTPUT_PATH}/${ACTIVE_SERVERS_FILENAME}`,
}
