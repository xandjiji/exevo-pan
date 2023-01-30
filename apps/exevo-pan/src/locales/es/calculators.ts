export default {
  Meta: {
    Main: {
      title: 'Calculadoras',
      description:
        'Todo tipo de calculadoras y herramientas de Tibia para ayudarte!',
    },
    ExerciseWeapons: {
      title: 'Exercise weapons',
      description:
        'Averigua cuantas exercise weapons, tiempo y dinero necesitas para llegar a tu skill deseado',
    },
    Stamina: {
      title: 'Stamina',
      description: 'Calcula cuánto tiempo hace falta para recuperar tu stamina',
    },
    CharmDamage: {
      title: 'Charm Damage',
      description:
        'Compara el daño medio entre diferentes charms para ver cual es mejor',
    },
    /* @ ToDo: */
    ImbuementsCost: {
      title: 'Imbuements Cost',
      description:
        'Calculate the cheapest way to buy materials for your imbuements',
    },
    /* @ ToDo: */
    LootSplit: {
      title: 'Loot Split',
      description: 'Manage and split your party hunt loots',
    },
  },
  Header: {
    Main: 'Principal',
    ExerciseWeapons: 'Exercise weapons',
    CharmDamage: 'Charm Damage',
    Stamina: 'Stamina',
    /* @ ToDo: */
    ImbuementsCost: 'Imbuements Cost',
    /* @ ToDo: */
    LootSplit: 'Loot Split',
  },
  none: 'Nada',
  ExerciseWeapons: {
    labels: {
      vocation: 'Vocación',
      currentSkill: 'Skill actual',
      targetSkill: 'Skill deseado',
      percentageLeft: '% para subir',
      loyaltyPoints: 'puntos',
      weaponCharges: 'Cargas de la varita',
      results: 'Resultados',
      moneyCost: 'Coste de dinero',
      weapons: 'Varitas',
      time: 'Tiempo necesario',
    },
    moneyTooltip: {
      a: 'Si el precio de las TC es',
      b: 'mayor',
      c: 'que',
      d: 'entonces deberías comprar las varitas usando',
      e: 'gold',
    },
  },
  Stamina: {
    currentStamina: 'Stamina actual',
    desiredStamina: 'Stamina deseada',
    track: 'Seguimiento',
    restTime: 'Tiempo de descanso',
    newCharacter: 'Nombre del personaje',
    removeItem: 'Eliminar',
  },
  CharmDamage: {
    thisArticle: 'este artículo',
  },
  /* @ ToDo: */
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
  /* @ ToDo: */
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
}
