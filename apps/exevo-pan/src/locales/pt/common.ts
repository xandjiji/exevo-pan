import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/common'

export default defaultComposer(defaultTranslations, {
  error: {
    P1: 'oops!',
    P2: 'página não encontrada!',
    ErrorLabel: 'Erro, algo inesperado aconteceu',
  },
  Header: {
    h1: {
      home: 'Compre e venda de chares de Tibia no Char Bazaar oficial!',
      calculators: 'Todo tipo de ferramentas e calculadoras para Tibia',
      statistics:
        'Descubra estatísticas sobre personagens vendidos no Char Bazaar!',
      highscores:
        'Top levels, maiores skills e personagens mais caros do Char Bazaar!',
      about: 'Sobre o site Exevo Pan, declarações e informações de contato.',
      war: 'Acompanhe estatísticas ao vivo da guerra de Libertabra!',
      advertise: 'Destaque seu leilão e receba lances mais altos!',
      blog: 'Blog',
      bossTracker: 'Descubra onde e quando bosses irão nascer!',
    },
    openMenuLabel: 'Abrir menu',
    closeMenuLabel: 'Fechar menu',
    openUserMenu: 'Abrir menu de usuário',
    logoLabel: 'Ir para a página inicial',
    nav: {
      charBazaar: 'Char Bazaar',
      calculators: 'Calculadoras',
      statistics: 'Estatísticas',
      war: 'Libertabra War',
      about: 'Sobre',
      advertise: 'Anunciar',
      blog: 'Blog',
      bossTracker: 'Bosses',
      exevopro: 'Exevo Pro',
    },
    themeSwitch: 'Habilitar tema noturno',
    AccountButton: {
      dashboard: 'Painel',
      logout: 'Logout',
    },
  },
  BlogTags: {
    news: 'Notícias',
    article: 'Artigo',
    tutorial: 'Tutorial',
    tips: 'Dicas',
  },
  or: 'ou',
  and: 'e',
  transfer: 'transferir',
  from: 'de',
  to: 'para',
  day: 'dia',
  days: 'dias',
  hour: 'hora',
  hours: 'horas',
  minute: 'minuto',
  minutes: 'minutos',
  today: 'hoje',
  tomorrow: 'amanhã',
  Month: {
    '0': 'Jan',
    '1': 'Fev',
    '2': 'Mar',
    '3': 'Abr',
    '4': 'Mai',
    '5': 'Jun',
    '6': 'Jul',
    '7': 'Ago',
    '8': 'Set',
    '9': 'Out',
    '10': 'Nov',
    '11': 'Dez',
  },
  FullMonth: {
    '0': 'Janeiro',
    '1': 'Fevereiro',
    '2': 'Março',
    '3': 'Abril',
    '4': 'Maio',
    '5': 'Junho',
    '6': 'Julho',
    '7': 'Agosto',
    '8': 'Setembro',
    '9': 'Outubro',
    '10': 'Novembro',
    '11': 'Dezembro',
  },
  Weekdays: {
    '0': 'Dom',
    '1': 'Seg',
    '2': 'Ter',
    '3': 'Qua',
    '4': 'Qui',
    '5': 'Sex',
    '6': 'Sáb',
  },
  FullWeekdays: {
    '0': 'Domingo',
    '1': 'Segunda',
    '2': 'Terça',
    '3': 'Quarta',
    '4': 'Quinta',
    '5': 'Sexta',
    '6': 'Sábado',
  },
  AuctionTimer: {
    finishedAuction: 'Leilão terminou em',
    unfinishedAuction: 'Leilão termina em',
    auctionEndsIn: 'Leilão termina em',
    auctionIsOver: 'Leilão terminou',
    auctionEnded: 'Leilão encerrado!',
  },
  RemoveItem: 'Remover item',
  TibiaCoinsCta: {
    text: 'Comprar Tibia Coins',
    link: 'https://www.reidoscoins.com.br/?tracking=60b8120a1ab43',
  },
  TibiaBlackjackCta: {
    text: 'Jogar Tibia Blackjack',
  },
  Ravendawn: {
    link: 'https://ravenquest.io/register?utm_source=exevopan&utm_medium=wiki&utm_campaign=rq_launch&utm_term=mmorpg+ravenquest+nostalgic&utm_content=banner125x125',
    text: 'Jogar Ravendawn',
  },
  NoPing: {
    link: 'https://noping.com/',
    text: 'Melhore seu ping',
  },
  CloseDrawerLabel: 'Fechar menu',
  RepoLinkText: 'Ir para este repositório',
  MadeBy: 'criado por',
  ClearInputLabel: 'Limpar campo',
  InputIconLabels: {
    valid: 'Campo válido',
    invalid: 'Campo inválido',
    loading: 'Validando...',
  },
  Of: 'de',
  Paginator: {
    FirstLabel: 'Ir para a primeira página',
    PreviousLabel: 'Ir para a página anterior',
    NextLabel: 'Ir para a próxima página',
    LastLabel: 'Ir para a última página',
  },
  PopoverCloseLabel: 'Clique aqui para fechar',
  ChangeValueLabel: 'alterar valor',
  UpdatingDataText: 'Atualizando dados...',
  PreferredLanguageLabel: 'Mudar idioma',
  SpecialTags: {
    manyCharms: 'Muitos charms',
    manyQuests: 'Muitas quests',
    manyMounts: 'Muitas mounts',
    manyStoreCosmetics: 'Muitos cosmeticos comprados 🛍️',
    rareMounts: 'Mounts raras ✨',
    rareOutfits: 'Outfits raras 💎',
    secondaryEkSkill: 'Skill secundária ⚔️',
    soulwarAvailable: 'Soul War disponível 💀',
    primalAvailable: 'Primal Ordeal disponível 🦖',
  },
  CharacterCard: {
    linkLabel: 'Ir para a página do personagem',
    bidLabelText: {
      auctionSuccessful: 'Leilão sucedeu',
      auctionFailed: 'Leilão falhou',
      currentBid: 'Lance atual',
      minimumBid: 'Lance mínimo',
    },
    auctionEnd: 'Fim do leilão',
    featuredItem: 'Item destacado',
    experimentalServer: 'Este é um servidor experimental!',
    transferAvailable: 'Transferência comum de servidor disponível',
    transferUnavailable: 'Transferência comum de servidor NÃO disponível',
    Tooltips: {
      labels: {
        imbuements: 'Lista de imbuements',
        charms: 'Lista de charms',
        quests: 'Lista de quests',
        supremeGems: 'Modificadores supremos de gema disponíveis',
      },
      quests: {
        utilitary: 'Úteis',
        access: 'Acessos',
        boss: 'Bosses',
        other: 'Outros',
      },
    },
    tcInvested: {
      prefix: 'Este personagem tem investido pelo menos',
      suffix: 'Tibia Coins em compras na store',
      invested: 'investido',
      exclusive: 'Exclusivo {{exevopro}}',
    },
    AuctionStatus: 'Status do leilão',
    BidStatus: 'Lance atual',
    highlightLabelText: 'Destaque seu leilão!',
    CharacterModal: {
      totalInvested: 'Total investido',
      exclusive: '(exclusivo {{exevopro}})',
      SpriteBox: {
        firstAddon: 'Primeiro addon',
        secondAddon: 'Segundo addon',
      },
    },
  },
  StepperCompletedLabel: 'Passo completado',
  CopyButton: {
    toCopyLabel: 'Copiar',
    copiedLabel: 'Copiado',
  },
  Accordion: {
    open: 'Abrir',
    close: 'Fechar',
  },
  Dialog: {
    close: 'Fechar modal',
  },
  FooterTitle: 'Exevo Pan - criado por',
  AnchorIconLabel: 'Copiar link',
  CharacterTooltipLabel: 'Ir para a página do personagem',
  Newsticker: 'Artigos recentes',
  SignIn: {
    title: 'Entrar com',
    subtext: 'Ao criar uma conta, você está concordando com os nossos',
  },
  termsOfService: 'Termos de Serviço',
  privacyPolicy: 'Política de Privacidade',
  SuggestedReading: {
    miniTitle: 'Leitura recomendada:',
  },
  RangeDatePicker: {
    currentMonthLabel: 'Mês atual',
    nextMonthLabel: 'Próximo mês',
  },
  genericError: 'Ops! Algo deu errado',
  genericLoading: 'Carregando...',
  exevoProCTA: 'Seja {{exevoPro}}',
  play: 'Jogue',
  SetupNotifications: {
    notAuthed: 'Você deve {{logIn}} para usar notificações',
    logIn: 'logar',
    permission: 'Por favor {{enableNotifications}} neste dispositivo',
    enableNotifications: 'habilite notificações',
    deviceReady: 'Este dispositivo está recebendo {{notifications}}!',
    notifications: 'notificações',
    testTitle: 'Olá 👋',
    testText: 'Como vai você?',
    successMessage: 'Dispositivo registrado!',
  },
  AuctionEstimationAlerts: {
    Disclaimer: {
      first: 'Valor é sempre {{subjective}}!',
      subjective: 'subjetivo',
      second: 'Esta estimativa considera apenas:',
      server: 'Tipo de servidor',
      character: 'Skills, level e vocação',
    },
    Failed: {
      message:
        'Não foram encontrados muitos leilões similares em nossa base de dados',
    },
    ProOnly: {
      message:
        'Leilões com estimativas acima de {{freeCap}} estão disponíveis apenas para membros {{exevoPro}}',
    },
  },
  EstimatedPriceBox: {
    label: 'Preço estimado',
    similarFound: '{{count}} leilão similar',
    similarFoundPlural: '{{count}} leilões similares',
  },
  Menu: {
    buttonLabel: 'Alternar menu',
  },
})
