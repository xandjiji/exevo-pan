import { newsletter } from './newsletter'
import { proBosses } from './proBosses'
import { highlightCheckout } from './highlightCheckout'
import { proPayment } from './proPayment'
import { getAuctionById } from './getAuctionById'
import { listProOrders, updateProOrders } from './admin/proOrders'
import { proRevenue } from './admin/proRevenue'
import { listAuctionHighlights } from './admin/auctionHighlights'

export const routes = {
  getAuctionById,
  proBosses,
  newsletter,
  highlightCheckout,
  proPayment,
  listProOrders,
  updateProOrders,
  proRevenue,
  listAuctionHighlights,
}
