import { OUTPUT_PATH } from './types'

const path = {
  bossStatistics: `${OUTPUT_PATH}/bossStatistics`,
}

export const BOSS_STATISTICS = {
  path: path.bossStatistics,
  serverResolver: (serverName: string): string =>
    `${path.bossStatistics}/${serverName}.json`,
}
