import { newsletter } from './newsletter'
import { proBosses } from './proBosses'
import { highlightCheckout } from './highlightCheckout'
import { checkProCoupon, proPayment } from './proPayment'
import { getAuctionById } from './getAuctionById'
import * as proOrders from './admin/proOrders'
import * as proRevenue from './admin/proRevenue'
import * as highlightRevenue from './admin/highlightRevenue'
import * as auctionHighlights from './admin/auctionHighlights'
import { revalidatePage } from './admin/revalidatePage'
import * as notifyAdmin from './admin/notifyAdmin'
import { notifyUser } from './admin/notifyUser'
import * as manageReferrals from './admin/manageReferrals'
import * as guildCrud from './guild/crud'
import { registerNotificationDevice } from './registerNotificationDevice'
import { registerAuctionNotification } from './registerAuctionNotification'
import { testMyNotification } from './testMyNotification'
import * as dashboard from './dashboard'
import * as auctions from './auctions'
import * as referrals from './referrals'

export const routes = {
  registerNotificationDevice,
  registerAuctionNotification,
  notifyUser,
  getAuctionById,
  proBosses,
  newsletter,
  highlightCheckout,
  proPayment,
  checkProCoupon,
  revalidatePage,
  testMyNotification,
  ...proOrders,
  ...proRevenue,
  ...auctionHighlights,
  ...highlightRevenue,
  ...notifyAdmin,
  ...guildCrud,
  ...dashboard,
  ...auctions,
  ...referrals,
  ...manageReferrals,
}
