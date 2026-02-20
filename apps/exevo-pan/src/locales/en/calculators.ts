export default {
  Meta: {
    Main: {
      title: 'Tibia Calculators',
      description:
        'Tibia calculators and tools for Char Bazaar, skills, loot split, imbuements, and stamina.',
    },
    ExerciseWeapons: {
      title: 'Tibia Exercise Weapons Calculator',
      description:
        'Calculate skill training cost, time, and exercise weapons needed in Tibia.',
    },
    Stamina: {
      title: 'Tibia Stamina Calculator',
      description:
        'Track Tibia stamina recovery time and offline training progress.',
    },
    CharmDamage: {
      title: 'Tibia Charm Damage Calculator',
      description:
        'Compare Tibia charm damage and average procs to choose the best charm.',
    },
    ImbuementsCost: {
      title: 'Tibia Imbuement Calculator',
      description:
        'Calculate the cheapest Tibia imbuement materials and gold token costs.',
    },
    LootSplit: {
      title: 'Tibia Loot Split Calculator',
      description:
        'Split party hunt loot in Tibia and calculate profit per member.',
    },
    AuctionEstimation: {
      title: 'Tibia Character Bazaar Price Estimator',
      description:
        'Estimate Tibia Character Bazaar auction prices using recent sales.',
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
