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
  },
  Layout: {
    nav: {
      root: 'My account',
      transactions: 'Transaction history',
      notifications: 'Auction notifications',
      devices: 'Notification devices',
    },
  },
  UserCard: {
    proSince: 'Pro since',
    freeStatus: 'Free',
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
    confirm: 'Confirm',
    orderReceived: 'Your order was received!',
    transactionId: 'Transaction ID',
    notice:
      "Your purchase will be delivered right after your payment is confirmed. If your order can't be completed, your coins will be returned.",
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
}
