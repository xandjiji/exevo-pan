import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/calculators'

export default defaultComposer(defaultTranslations, {
  Meta: {
    Main: {
      title: 'Calculadoras Tibia',
      description:
        'Calculadoras e ferramentas de Tibia para Char Bazaar, skills, loot split, imbuements e stamina.',
    },
    ExerciseWeapons: {
      title: 'Calculadora de Exercise Weapons Tibia',
      description:
        'Calcule custo, tempo e quantidade de exercise weapons para treinar skills no Tibia.',
    },
    Stamina: {
      title: 'Calculadora de Stamina Tibia',
      description:
        'Acompanhe o tempo de recuperação da stamina e treino offline no Tibia.',
    },
    CharmDamage: {
      title: 'Calculadora de Dano de Charm Tibia',
      description:
        'Compare o dano médio dos charms no Tibia e escolha a melhor opção.',
    },
    ImbuementsCost: {
      title: 'Calculadora de Imbuements Tibia',
      description:
        'Calcule a forma mais barata de comprar materiais e gold tokens para imbuements.',
    },
    LootSplit: {
      title: 'Calculadora de Dividir Loot Tibia',
      description:
        'Divida o loot da party no Tibia e calcule o lucro por membro.',
    },
    AuctionEstimation: {
      title: 'Estimador de Preço do Char Bazaar Tibia',
      description:
        'Estime preços de leilões do Char Bazaar com base em vendas recentes.',
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
    goToHistory: 'Explore mais leilões passados em nosso {{history}}',
    history: 'Histórico do Char Bazaar',
  },
})
