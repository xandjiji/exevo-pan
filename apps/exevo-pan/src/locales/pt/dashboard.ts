import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/dashboard'

export default defaultComposer(defaultTranslations, {
  Meta: {
    root: {
      title: 'Painel',
      description: 'Meu painel no Exevo Pan',
    },
    transactions: {
      title: 'Histórico de Transações',
      description: 'Meu histórico de transações no Exevo Pan',
    },
    auctionNotifications: {
      title: 'Notificações de Leilão',
      description: 'Minhas notificações de leilão',
    },
    devices: {
      title: 'Notificações em Dispositivos',
      description: 'Meus dispositivos de notificação',
    },
    referrals: {
      title: 'Indicações',
      description: 'Ganhe Tibia Coins indicando seus amigos!',
    },
  },
  Layout: {
    nav: {
      root: 'Minha conta',
      transactions: 'Histórico de transações',
      notifications: 'Notificações de leilões',
      devices: 'Notificações em dispositivos',
      referrals: 'Indicações',
    },
  },
  UserCard: {
    proSince: 'Pro desde',
    freeStatus: 'Básico',
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
      estimate: 'Estime preços de leilões acima de {{maxEstimation}}',
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
    total: 'Total:',
    qrCodeText: 'ou use o QR Code:',
    confirm: 'Confirmar',
    orderReceived: 'Seu pedido foi enviado!',
    transactionId: 'ID da transação',
    notice:
      'Seu pedido será entregue logo após confirmarmos o seu pagamento. Se o seu pedido não puder ser completado, seu dinheiro será devolvido.',
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
  AuctionNotifications: {
    title: 'Notificações de leilão',
    auction: 'Leilão',
    notifyOnBid: 'Notificar lances',
    notifyAt: 'Notificar em',
    deleteLabel: 'Remover notificação de leilão',
    emptyState: 'Sem notificações',
    successMessage: 'Notificação de leilão foi removida',
    dialogHeading: 'Remover notificação',
    dialogText: 'Você tem certeza de que deseja remover esta notificação?',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  Devices: {
    successMessage: 'Dispositivo foi removido',
    title: 'Meus dispositivos',
    dialogHeading: 'Remover dispositivo',
    dialogText: 'Você tem certeza de que deseja remover este dispositivo?',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    device: 'Dispositivo',
    date: 'Data',
    emptyState: 'Nenhum dispositivo',
  },
  Referrals: {
    couponSuccess: 'Seu cupom foi atualizado!',
    couponError: 'Esse cupom já está em uso',
    withdrawSuccess: 'Saque solicitado com sucesso!',
    freeAlert: 'Indicações são disponíveis apenas para membros {{exevoPro}}',
    summaryTitle: 'Resumo',
    li1: 'Usando o seu cupom, usuários receberão {{discount}} de desconto ao comprarem {{exevoPro}}, que vale {{value}} na hora do pagamento.',
    li2: 'Para cada venda realizada com o seu cupom, você ganhará {{tc}} de comissão.',
    li3: ' Não existe limites ou requisitos mínimos para sacar. Pode levar até 24 horas para que você receba suas Tibia Coins.',
    currentBalance: 'Saldo atual:',
    withdrawLabel: 'Sacar coins para',
    withdrawButton: 'Sacar',
    cancelButton: 'Cancelar',
    myCouponTitle: 'Meu cupom',
    customizeCoupon: 'Customizar cupom',
    saveCouponButton: 'Salvar',
    CouponPreview: {
      preview: 'Imagem:',
      referralLink: 'Link de indicação:',
    },
  },
})
