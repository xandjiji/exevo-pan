export default {
  Meta: {
    Main: {
      title: 'Calculators',
      description: 'All sorts of Tibia tools and calculators to help you out!',
    },
    ExerciseWeapons: {
      title: 'Exercise weapons',
      description:
        'Find out how many exercise weapons, time and money would cost to achieve your desired skill',
    },
    Stamina: {
      title: 'Stamina',
      description:
        'Calculate and track how much time it takes to restore your stamina',
    },
    CharmDamage: {
      title: 'Charm Damage',
      description:
        'Compare the average damage between different charms to see which one is best',
    },
    ImbuementsCost: {
      title: 'Imbuements Cost',
      description:
        'Calculate the cheapest way to buy materials for your imbuements',
    },
    LootSplit: {
      title: 'Loot Split',
      description: 'Manage and split your party hunt loots',
    },
    AuctionEstimation: {
      title: 'Auction price estimations',
      description: 'Estimate the price of any character on the Char Bazaar',
    },
  },
  none: 'None',
  ExerciseWeapons: {
    labels: {
      vocation: 'Vocation',
      currentSkill: 'Current skill',
      targetSkill: 'Target skill',
      percentageLeft: '% left',
      loyaltyPoints: 'points',
      weaponCharges: 'Weapon charges',
      results: 'Results',
      moneyCost: 'Money cost',
      weapons: 'Weapons',
      time: 'Time required',
    },
    moneyTooltip: {
      a: 'If the TC price is',
      b: 'higher',
      c: 'than',
      d: 'then you should buy exercise weapons using',
      e: 'gold',
    },
  },
  Stamina: {
    currentStamina: 'Current stamina',
    desiredStamina: 'Desired stamina',
    track: 'Track',
    restTime: 'Rest time',
    newCharacter: 'New character',
    removeItem: 'Remove item',
  },
  CharmDamage: {
    thisArticle: 'this article',
  },
  ImbuementsCost: {
    labels: {
      configurations: 'Configurations',
      goldToken: 'Gold Token price',
    },
    totalCost: 'Total cost',
    goldTokenOnly: 'Gold Tokens only',
    marketOnly: 'Market only',
    tooltipInfo: '(Includes: base price + 100% success fee)',
    pricePlaceholder: 'Current price',
    buyIconTooltip: 'Should be bought using',
  },
  LootSplit: {
    tabs: {
      newSession: 'New session',
      history: 'History',
    },
    labels: {
      textArea: 'Paste your party hunt session',
      tooltipClipboard: 'Party Hunt session analyser',
      summary: 'Summary',
      teamSession: 'Team session',
      transfers: 'Transfers',
      total: {
        waste: 'Total waste',
        profit: 'Total profit',
      },
    },
    each: 'each',
    emptyState: 'No session',
    actions: {
      save: 'Save',
      delete: 'Delete',
      data: 'Data',
      done: 'Done',
    },
    advancedOptions: 'Advanced options',
    AdvancedOptionsDialog: {
      addExtraExpenses: 'Add extra expenses',
      extraCostPlaceholder: 'Extra gold costs',
      removePlayer: 'Remove player',
    },
    SessionDialog: {
      originalSession: 'Original hunt session',
      extraExpenses: 'Extra expenses',
      removedPlayers: 'Removed players',
    },
    Clipboard: {
      teamSession: 'Team session',
      partyMembers: 'Party members',
      bankTransfers: 'Bank transfers',
      shouldTransfer: 'should transfer',
      to: 'to',
    },
    toast: {
      added: 'Session was saved',
      removed: 'Session was removed',
    },
  },
  AuctionEstimation: {
    location: 'Server location',
    battleye: {
      green: 'Green',
      yellow: 'Yellow',
    },
    vocation: 'Vocation',
    search: 'Search',
    similarAuctions: 'Similar auctions',
    emptyState: 'No auctions',
    goToHistory: 'Explore more past auctions using our {{history}}',
    history: 'Char Bazaar History',
  },
}
