export default {
  Meta: {
    root: {
      title: 'Dashboard',
      description: 'My Exevo Pan dashboard',
    },
    transactions: {
      title: 'Transaction History',
      description: 'My Exevo Pan transaction history',
    },
    auctionNotifications: {
      title: 'Auction Notifications',
      description: 'My auction notifications',
    },
    devices: {
      title: 'Notification Devices',
      description: 'My notification devices',
    },
  },
  Layout: {
    nav: {
      root: 'My account',
      transactions: 'Transaction history',
      notifications: 'Auction notifications',
      devices: 'Notification devices',
      referrals: 'Referrals',
    },
  },
  UserCard: {
    proSince: 'Pro since',
    freeStatus: 'Basic',
  },
  Pitch: {
    thankYou: 'Thank you for being',
    upgradeNow: 'Upgrade now to',
    enjoyFeatures: 'Enjoy your exclusive features:',
    exclusiveFeatures: 'And have access to exclusive features!',
    features: {
      tcInvested: 'Find out how much TC was invested in any Bazaar character',
      exclusiveFilters: 'Exclusive {{auctionFilters}}',
      auctionFilters: 'auction filters',
      exclusiveBosses: 'Access to all bosses from {{bossTracker}}',
      bossTracker: 'Boss Tracker',
      discounts: 'Discounts for {{auctionHighlighting}}',
      auctionHighlighting: 'auction highlighting',
      bidNotifications:
        'Track auctions receiving {{notifications}} when they are bidded',
      notifications: 'notifications',
      privateGroups: 'Create {{private}} boss hunting groups',
      private: 'private',
      estimate: 'Estimate auction prices above {{maxEstimation}}',
    },
    filtersTooltip: {
      tc: 'Tibia Coins invested',
      store: 'Store mounts and outfits',
      rareItems: 'Rare items',
      soulwar: 'Soul War available',
      primalOrdeal: 'Primal Ordeal available',
    },
    more: '...and more in the future!',
    payOnce: 'Pay once, yours',
    forever: 'forever',
  },
  PurchaseForm: {
    order: 'Order',
    payment: 'Payment',
    paymentCharacterLabel: 'Sending coins character',
    total: 'Total:',
    qrCodeText: 'or using the following QR Code:',
    confirm: 'Confirm',
    orderReceived: 'Your order was received!',
    transactionId: 'Transaction ID',
    notice:
      "Your purchase will be delivered right after your payment is confirmed. If your order can't be completed, your money will be returned.",
    edit: 'Edit your order',
  },
  TransactionHistory: {
    title: 'Transaction History',
    description: 'Description',
    price: 'Price',
    paymentCharacter: 'Payment character',
    status: 'Status',
    confirmed: 'Confirmed',
    processing: 'Processing',
    auction: 'Auction',
    highlightedDays: 'Highlighted days',
    auctionHighlight: 'Auction Highlight',
    emptyState: 'No transactions',
  },
  AuctionNotifications: {
    title: 'Auction notifications',
    auction: 'Auction',
    notifyOnBid: 'Notify on bid',
    notifyAt: 'Notify at',
    deleteLabel: 'Remove this auction notification',
    emptyState: 'No notifications',
    successMessage: 'Auction notification was removed',
    dialogHeading: 'Remove notification',
    dialogText: 'Are you sure you want to remove this notification?',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  Devices: {
    successMessage: 'Device was removed',
    title: 'My devices',
    dialogHeading: 'Remove device',
    dialogText: 'Are you sure you want to remove this device?',
    cancel: 'Cancel',
    confirm: 'Confirm',
    device: 'Device',
    date: 'Date',
    emptyState: 'No devices',
  },
}
