import { BOSS_STATISTICS, BOSS_CHANCES } from './bossStatistics'
import { CURRENT_AUCTIONS } from './currentAuctions'
import { HISTORY_AUCTIONS, SCRAP_HISTORY_DATA } from './historyAuctions'
import { HISTORY_STATISTICS } from './historyStatistics'
import { SCRAP_RAW_DATA, RAW_DATA_FOLDER } from './rawBazaar'

export const file = {
  BOSS_STATISTICS,
  BOSS_CHANCES,
  CURRENT_AUCTIONS,
  HISTORY_AUCTIONS,
  SCRAP_HISTORY_DATA,
  HISTORY_STATISTICS,
  SCRAP_RAW_DATA,
  RAW_DATA_FOLDER,
} as const
