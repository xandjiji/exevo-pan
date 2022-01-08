import { CURRENT_AUCTIONS } from './currentAuctions'
import { HIGHLIGHTED_AUCTIONS } from './highlightedAuctions'
import { HISTORY_AUCTIONS, SCRAP_HISTORY_DATA } from './historyAuctions'
import { HISTORY_STATISTICS } from './historyStatistics'
import { RARE_ITEM_DATA } from './rareItemData'
import { SERVER_DATA } from './serverData'

export const file = {
  SERVER_DATA,
  CURRENT_AUCTIONS,
  HIGHLIGHTED_AUCTIONS,
  RARE_ITEM_DATA,
  HISTORY_AUCTIONS,
  SCRAP_HISTORY_DATA,
  HISTORY_STATISTICS,
} as const
