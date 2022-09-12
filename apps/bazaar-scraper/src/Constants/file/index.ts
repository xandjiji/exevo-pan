import { BOSS_STATISTICS } from './bossStatistics'
import { CURRENT_AUCTIONS } from './currentAuctions'
import { HISTORY_AUCTIONS, SCRAP_HISTORY_DATA } from './historyAuctions'
import { HISTORY_STATISTICS } from './historyStatistics'
import { RARE_ITEM_DATA } from './rareItemData'
import { SERVER_DATA, ACTIVE_SERVERS } from './serverData'
import { SCRAP_RAW_DATA, RAW_DATA_FOLDER } from './rawBazaar'

export const file = {
  BOSS_STATISTICS,
  SERVER_DATA,
  ACTIVE_SERVERS,
  CURRENT_AUCTIONS,
  RARE_ITEM_DATA,
  HISTORY_AUCTIONS,
  SCRAP_HISTORY_DATA,
  HISTORY_STATISTICS,
  SCRAP_RAW_DATA,
  RAW_DATA_FOLDER,
} as const
