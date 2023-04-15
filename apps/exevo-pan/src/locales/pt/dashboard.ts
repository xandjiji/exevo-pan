export default {
  Meta: {
    root: {
      title: 'Painel',
      description: 'Meu painel no Exevo Pan',
    },
    transactions: {
      title: 'Histórico de Transações',
      description: 'Meu histórico de transações no Exevo Pan',
    },
  },
  Layout: {
    nav: {
      root: 'Minha conta',
      transactions: 'Histórico de transações',
      notifications: 'Notificações de leilões',
      devices: 'Notificações em dispositivos',
    },
  },
  UserCard: {
    proSince: 'Pro desde',
    freeStatus: 'Grátis',
  },
  Pitch: {
    thankYou: 'Obrigado por ser',
    upgradeNow: 'Upgrade agora para',
    enjoyFeatures: 'Aproveite suas features exclusivas:',
    exclusiveFeatures: 'E ganhe acesso a features exclusivas!',
    features: {
      tcInvested:
        'Descubra quanto TC foi investido em qualquer personagem do Bazaar',
      exclusiveFilters: '{{auctionFilters}} exclusivos',
      auctionFilters: 'Filtros de leilão',
      exclusiveBosses: 'Acesso a todos os bosses do {{bossTracker}}',
      bossTracker: 'Boss Tracker',
      discounts: 'Descontos para {{auctionHighlighting}}',
      auctionHighlighting: 'destacar leilões',
      bidNotifications:
        'Marque um leilão e receba {{notifications}} quando ele receber lances',
      notifications: 'notificações',
      privateGroups: 'Crie grupos {{private}} de boss hunting',
      private: 'privados',
    },
    filtersTooltip: {
      tc: 'Tibia Coins investidos',
      store: 'Montarias e outfits da store',
      rareItems: 'Items raros',
      soulwar: 'Soul War disponível',
      primalOrdeal: 'Primal Ordeal disponível',
    },
    more: '...e mais no futuro!',
    payOnce: 'Pague uma vez, seu',
    forever: 'para sempre',
  },
  PurchaseForm: {
    order: 'Pedido',
    payment: 'Pagamento',
    paymentCharacterLabel: 'Personagem que enviará as coins',
    confirm: 'Confirmar',
    orderReceived: 'Seu pedido foi enviado!',
    transactionId: 'ID da transação',
    notice:
      'Seu pedido será entregue logo após confirmarmos o seu pagamento. Se o seu pedido não puder ser completado, suas coins serão devolvidas.',
    edit: 'Editar pedido',
  },
  TransactionHistory: {
    title: 'Histórico de Transações',
    description: 'Descrição',
    price: 'Preço',
    paymentCharacter: 'Personagem de pagamento',
    status: 'Status',
    confirmed: 'Confirmado',
    processing: 'Processando',
    auction: 'Leilão',
    highlightedDays: 'Dias destacados',
    auctionHighlight: 'Destaque de leilão',
    emptyState: 'Sem transações',
  },
}
