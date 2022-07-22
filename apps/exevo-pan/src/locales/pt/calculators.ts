export default {
  Meta: {
    Main: {
      title: 'Calculadoras',
      description:
        'Diversas ferramentas e calculadoras de Tibia para de ajudar!',
    },
    ExerciseWeapons: {
      title: 'Exercise weapons',
      description:
        'Descubra quantas exercise weapons, tempo e dinheiro você precisa para alcançar o seu skill desejado',
    },
    Stamina: {
      title: 'Stamina',
      description:
        'Calcule e acompanhe quanto tempo falta para restaurar sua stamina',
    },
    CharmDamage: {
      title: 'Charm Damage',
      description:
        'Compare a média de dano entre diferentes charms para descobrir qual é a melhor',
    },
    ImbuementsCost: {
      title: 'Custo de Imbuements',
      description:
        'Calcule qual a forma mais barata de se comprar materiais para imbuements',
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
    ImbuementsCost: 'Custo de Imbuements',
    LootSplit: 'Loot Split',
  },
  none: 'Nenhum',
  ExerciseWeapons: {
    labels: {
      vocation: 'Vocação',
      currentSkill: 'Skill atual',
      targetSkill: 'Skill desejado',
      percentageLeft: '% restante',
      loyaltyPoints: 'pontos',
      weaponCharges: 'Weapon charges',
      results: 'Resultados',
      moneyCost: 'Custo',
      weapons: 'Armas',
      time: 'Tempo necessário',
    },
    moneyTooltip: {
      a: 'Se o preço do TC está',
      b: 'maior',
      c: 'que',
      d: 'então você deve comprar exercise weapons usando',
      e: 'gold',
    },
  },
  Stamina: {
    currentStamina: 'Stamina atual',
    desiredStamina: 'Stamina desejada',
    track: 'Acompanhar',
    restTime: 'Tempo de descanso',
    newCharacter: 'Novo personagem',
    removeItem: 'Remover item',
  },
  CharmDamage: {
    moreInfo: 'Para mais informações sobre Charms, confira',
    thisArticle: 'este artigo',
  },
  ImbuementsCost: {
    labels: {
      configurations: 'Configurações',
      goldToken: 'Preço do Gold Token',
    },
    totalCost: 'Custo total',
    goldTokenOnly: 'Apenas Gold Tokens',
    marketOnly: 'Apenas Market',
    tooltipInfo: '(Inclui: preço base + taxa de 100% de sucesso)',
    pricePlaceholder: 'Preço atual',
    buyIconTooltip: 'Deve ser comprado usando',
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
    AdvancedOptionsDialog: {
      addExtraExpenses: 'Add extra expenses',
      extraCostPlaceholder: 'Extra gold costs',
    },
    SessionDialog: {
      originalSession: 'Original hunt session',
      extraExpenses: 'Extra expenses',
    },
    Clipboard: {
      teamSession: 'Team session',
      partyMembers: 'Party members',
      bankTransfers: 'Bank transfers',
      shouldTransfer: 'should transfer',
      to: 'to',
    },
  },
}
