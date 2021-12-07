export default {
  Meta: {
    title: 'Exevo Pan - Current Auctions',
    description:
      'Filter and search for Tibia characters on the official Char Bazaar!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Open filter drawer',
    sortingButtonLabel: 'Set the sorting order and criteria',
    filter: 'filter',
    filters: 'filters',
    is: 'is',
    are: 'are',
    active: 'active',
    noItemsPagination: 'No characters found',
    filterDrawerLabel: 'Filter form',
    descendingSwitchLabel: 'Sort by descending order',
    descending: 'Descending',
    sortModes: {
      auctionEnd: 'Auction End',
      level: 'Level',
      price: 'Price',
      priceBidded: 'Price (bidded only)',
    },
    noAuctionFound: 'Sorry, no auction was found',
    changeFilters: 'Change filters',
    notFoundAlt: 'No character was found',
  },
  FilterDrawer: {
    title: 'Filters',
    labels: {
      searchNickname: 'Search nickname',
      vocation: 'Vocation',
      serverLocation: 'Server location',
      minSkill: 'Minimum skill level',
      rareItems: 'Rare items',
      rareAchievements: 'Rare achievements',
      misc: 'Misc',
    },
    placeholders: {
      server: 'Choose a server',
      imbuements: 'Select imbuements',
      charms: 'Select charms',
      quests: 'Select quests',
      achievements: 'Select achievements',
      rareItems: 'Choose an item',
    },
    tooltips: {
      rareItems:
        'If a rare item is not on this list it means that there are no auctions available with it.',
      rareNicknames:
        "Nicknames with special characters (äëïöüÿ'-.,), 2-3 characters length and consecutive uppercase letters (e.g XVI)",
      soulwar: 'Characters level 250+ with Soul War not completed',
    },
    toggleAll: {
      imbuements: 'All imbuements',
      charms: 'All charms',
      items: 'All items',
    },
    resetFilters: 'Reset filters',
    green: 'Green',
    yellow: 'Yellow',
    rareNicknamesButton: 'Rare nicknames',
    soulwarButton: 'Soulwar available',
    skullEmoji: 'skull',
    SpritePicker: {
      item: 'item is selected',
      items: 'items are selected',
    },
  },
}
