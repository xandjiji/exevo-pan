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
    LootSplit: {
      title: 'Dividir Loot',
      description: 'Gerencie e divida o loot das suas hunts em party',
    },
    AuctionEstimation: {
      title: 'Estimar preço de leilões',
      description: 'Estime o preço de qualquer personagem no Char Bazaar',
    },
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
  LootSplit: {
    tabs: {
      newSession: 'Nova sessão',
      history: 'Histórico',
    },
    labels: {
      textArea: 'Cole a sessão do seu time',
      tooltipClipboard: 'Analyser de uma sessão de hunt em time',
      summary: 'Resumo',
      teamSession: 'Sessão do time',
      transfers: 'Transferências',
      total: {
        waste: 'Waste total',
        profit: 'Profit total',
      },
    },
    each: 'cada',
    emptyState: 'Nenhuma sessão',
    actions: {
      save: 'Salvar',
      delete: 'Deletar',
      data: 'Dados',
      done: 'Pronto',
    },
    advancedOptions: 'Opções avançadas',
    AdvancedOptionsDialog: {
      addExtraExpenses: 'Gastos adicionais',
      extraCostPlaceholder: 'Gold gasto adicional',
      removePlayer: 'Remover jogador',
    },
    SessionDialog: {
      originalSession: 'Sessão original do time',
      extraExpenses: 'Gastos adicionais',
      removedPlayers: 'Jogadores removidos',
    },
    Clipboard: {
      teamSession: 'Sessão do time',
      partyMembers: 'Membros do time',
      bankTransfers: 'Bank transfers',
      shouldTransfer: 'deve transferir',
      to: 'para',
    },
    toast: {
      added: 'Sessão salva',
      removed: 'Sessão removida',
    },
  },
  AuctionEstimation: {
    location: 'Localização do servidor',
    battleye: {
      green: 'Verde',
      yellow: 'Amarelo',
    },
    vocation: 'Vocação',
    search: 'Buscar',
    similarAuctions: 'Leilões similares',
    emptyState: 'Nenhum leilão',
  },
}
