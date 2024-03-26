import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/exevopro'

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Exevo PRO',
    description:
      'Faça agora seu upgrade para Exevo PRO e tenha acesso a conteúdo exclusivo!',
  },
  heading: 'Seja {{exevopro}}',
  heroCTA: 'Começar',
  bossTracker: {
    pitch: 'Acesso a todos os bosses do {{strong}}',
    strong: 'Boss Tracker',
  },
  tcInvested: {
    pitch:
      'Descubra quantas {{strong}} foram investidas em qualquer personagem do Bazaar',
    strong: 'Tibia Coins',
  },
  exclusiveFilters: {
    pitch: 'Acesso a {{strong}} exclusivos',
    strong: 'filtros de leilão',
    tcInvested: 'Tibia Coins investidas',
    storeContent: 'Mounts e outfits da store',
    rareItems: 'Items raros',
    soulwar: 'Soul War disponível',
    primalOrdeal: 'Primal Ordeal disponível',
  },
  highlightDiscount: {
    pitch: 'Descontos para {{strong}}',
    strong: 'destacar leilões',
  },
  notifications: {
    pitch: 'Marque um leilão e receba {{strong}} quando ele receber lances',
    strong: 'notificações',
  },
  huntingGroups: {
    pitch: 'Crie grupos {{strong}} de boss hunting',
    strong: 'privados',
  },
  andMore: '...e mais no futuro! 🔮',
  footer: 'Faça upgrade agora para {{exevopro}}',
  no: {
    subscriptions: 'Sem assinaturas',
    creditCard: 'Sem cartão de crédito',
    extraFees: 'Sem taxas adicionais',
  },
  only: 'Apenas',
  or: 'ou',
  payOnce: 'Pague uma vez, seu {{forever}}',
  forever: 'para sempre 🙌',
  footerCTA: 'Fazer upgrade',
  ComparisonTable: {
    free: 'Básico',
    auctions: 'Leilões',
    auctionFilters: 'Filtros de leilão',
    regularFilters: 'Filtros normais',
    premiumFilters: 'Filtros premium',
    history: 'Histórico do Char Bazaar',
    scheduleNotifications: 'Agendar notificações de leilões',
    bidNotifications: 'Notificações de lances em leilões',
    highlightDiscounts: 'Descontos para destacar leilões',
    tibiaCoinsInvested: 'Checar Tibia Coins investidas nos personagens',
    auctionPriceEstimations: 'Estimativas de preços de leilões',
    estimationFree: 'Valores até {{maxValue}}',
    bosses: 'Bosses',
    bossSpawnChances: 'Chances dos bosses nascerem',
    regularBosses: 'Bosses normais',
    premiumBosses: 'Bosses premium',
    huntingGroups: 'Sistema de checagem em grupo',
    privateGroups: 'Grupos privados de bosses',
    general: 'Geral',
    referrals: 'Sistema de indicações',
    earnReferral: 'Ganhe {{tc}} por indicação!',
  },
})
