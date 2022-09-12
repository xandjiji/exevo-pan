import { OUTPUT_PATH } from './types'

const path = {
  bossStatistics: `${OUTPUT_PATH}/bossStatistics`,
  bossChances: `${OUTPUT_PATH}/bossChances`,
}

export const BOSS_STATISTICS = {
  path: path.bossStatistics,
  serverResolver: (serverName: string): string =>
    `${path.bossStatistics}/${serverName}.json`,
}

export const BOSS_CHANCES = {
  path: path.bossChances,
  serverResolver: (serverName: string): string =>
    `${path.bossChances}/${serverName}.json`,
}
