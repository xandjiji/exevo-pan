import { newsletter } from './newsletter'
import { proBosses } from './proBosses'
import { highlightCheckout } from './highlightCheckout'
import { proPayment } from './proPayment'
import { getAuctionById } from './getAuctionById'
import * as proOrders from './admin/proOrders'
import * as proRevenue from './admin/proRevenue'
import * as auctionHighlights from './admin/auctionHighlights'

export const routes = {
  getAuctionById,
  proBosses,
  newsletter,
  highlightCheckout,
  proPayment,
  ...proOrders,
  ...proRevenue,
  ...auctionHighlights,
}
