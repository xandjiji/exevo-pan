import { newsletter } from './newsletter'
import { proBosses } from './proBosses'
import { highlightCheckout } from './highlightCheckout'
import { proPayment } from './proPayment'
import { getAuctionById } from './getAuctionById'
import * as proOrders from './admin/proOrders'
import * as proRevenue from './admin/proRevenue'
import * as highlightRevenue from './admin/highlightRevenue'
import * as auctionHighlights from './admin/auctionHighlights'
import { revalidatePage } from './admin/revalidatePage'
import * as notifyAdmin from './admin/notifyAdmin'
import { registerNotificationDevice } from './registerNotificationDevice'
import { registerAuctionNotification } from './registerAuctionNotification'
import { notifyUser } from './notifyUser'

export const routes = {
  registerNotificationDevice,
  registerAuctionNotification,
  notifyUser,
  getAuctionById,
  proBosses,
  newsletter,
  highlightCheckout,
  proPayment,
  revalidatePage,
  ...proOrders,
  ...proRevenue,
  ...auctionHighlights,
  ...highlightRevenue,
  ...notifyAdmin,
}
