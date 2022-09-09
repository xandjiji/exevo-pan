import { OUTPUT_PATH } from './types'

const path = `${OUTPUT_PATH}/bossStatistics`

export const BOSS_STATISTICS = {
  path,
  serverResolver: (serverName: string): string => `${path}/${serverName}.json`,
}
