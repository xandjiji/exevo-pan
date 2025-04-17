// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/common'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
  error: {
    P1: '¡oops!',
    P2: '¡página no encontrada!',
    ErrorLabel: 'Error, sucedió algo inesperado',
  },
  Header: {
    h1: {
      home: '¡Compra y vende caracteres de Tibia en el Char Bazaar oficial!',
      statistics:
        '¡Descubre estadísticas sobre personajes vendidos en el Char Bazaar!',
      highscores:
        'Top levels, top skills y personajes más caros del Char Bazaar!',
      about:
        'Acerca del sitio, declaraciones e información de contacto de Exevo Pan.',
      war: '¡Sigue las estadísticas en vivo de la guerra de Libertabra!',
      advertise: '¡Destaque su propia subasta y obtenga ofertas más altas!',
      blog: 'Blog',
      bossTracker: 'Find out where and when bosses will spawn!',
    },
    openMenuLabel: 'Abre el menú de navegación',
    closeMenuLabel: 'Cerrar el menú de navegación',
    logoLabel: 'Ir a la pagina principal',
    nav: {
      charBazaar: 'Char Bazaar',
      calculators: 'Calculadoras',
      statistics: 'Estadísticas',
      war: 'Libertabra War',
      about: 'Sobre',
      advertise: 'Anunciar',
      blog: 'Blog',
      bossTracker: 'Bosses',
      exevopro: 'Exevo Pro',
    },
    themeSwitch: 'Habilitar tema nocturno',
    AccountButton: {
      dashboard: 'Dashboard',
    },
  },
  BlogTags: {
    news: 'Noticias',
    article: 'Artículo',
    tutorial: 'Tutorial',
    tips: 'Consejos',
  },
  or: 'o',
  and: 'y',
  transfer: 'transfer',
  from: 'de',
  to: 'para',
  day: 'día',
  days: 'días',
  hour: 'hora',
  hours: 'horas',
  minute: 'minuto',
  minutes: 'minutos',
  today: 'hoy',
  tomorrow: 'mañana',
  Month: {
    '0': 'Ene',
    '1': 'Feb',
    '2': 'Mar',
    '3': 'Abr',
    '4': 'May',
    '5': 'Jun',
    '6': 'Jul',
    '7': 'Ago',
    '8': 'Sep',
    '9': 'Oct',
    '10': 'Nov',
    '11': 'Dic',
  },
  FullMonth: {
    '0': 'Enero',
    '1': 'Febrero',
    '2': 'Marzo',
    '3': 'Abril',
    '4': 'Mayo',
    '5': 'Junio',
    '6': 'Julio',
    '7': 'Agosto',
    '8': 'Septiembre',
    '9': 'Octubre',
    '10': 'Noviembre',
    '11': 'Diciembre',
  },
  Weekdays: {
    '0': 'D',
    '1': 'L',
    '2': 'M',
    '3': 'X',
    '4': 'J',
    '5': 'V',
    '6': 'S',
  },
  FullWeekdays: {
    '0': 'Domingo',
    '1': 'Lunes',
    '2': 'Martes',
    '3': 'Miércoles',
    '4': 'Jueves',
    '5': 'Viernes',
    '6': 'Sábado',
  },
  AuctionTimer: {
    finishedAuction: 'Subasta terminó en',
    unfinishedAuction: 'Subasta termina en',
    auctionEndsIn: 'Subasta termina en',
    auctionIsOver: 'Subasta finalizada',
    auctionEnded: '¡Subasta cerrada!',
  },
  RemoveItem: 'Eliminar el artículo',
  TibiaCoinsCta: {
    text: 'Compra Tibia Coins',
    link: 'https://edgartc.mx',
  },
  TibiaBlackjackCta: {
    text: 'Jugar Tibia Blackjack',
  },
  Ravendawn: {
    link: 'https://ravenquest.io/register?utm_source=exevopan&utm_medium=wiki&utm_campaign=rq_launch&utm_term=mmorpg+ravenquest+nostalgic&utm_content=banner125x125',
    text: 'Jugar Ravendawn',
  },
  NoPing: {
    link: 'https://noping.com/es',
    text: 'Improve your ping',
  },
  CloseDrawerLabel: 'Cerrar el menú',
  RepoLinkText: 'Ir a este repositorio',
  MadeBy: 'creado por',
  ClearInputLabel: 'Limpiar el campo',
  InputIconLabels: {
    valid: 'Campo valido',
    invalid: 'Campo inválido',
    loading: 'Validando...',
  },
  Of: 'de',
  Paginator: {
    FirstLabel: 'Ir a la primera pagina',
    PreviousLabel: 'Regresar a la pagina anterior',
    NextLabel: 'Ir a la página siguiente',
    LastLabel: 'Ir a la última página',
  },
  PopoverCloseLabel: 'Haga clic aquí para cerrar',
  ChangeValueLabel: 'cambiar valor',
  UpdatingDataText: 'Actualizando datos...',
  PreferredLanguageLabel: 'Cambiar idioma',
  SpecialTags: {
    manyCharms: 'Muchos charms',
    manyQuests: 'Muchas quests',
    manyMounts: 'Muchas mounts',
    manyStoreCosmetics: 'Muchos cosmeticos comprados 🛍️',
    rareMounts: 'Mounts raras ✨',
    rareOutfits: 'Outfits raras 💎',
    secondaryEkSkill: 'Skill secundaria ⚔️',
    soulwarAvailable: 'Soul War disponible 💀',
    primalAvailable: 'Primal Ordeal disponible 🦖',
  },
  CharacterCard: {
    linkLabel: 'Ir a la página del personaje',
    bidLabelText: {
      auctionSuccessful: 'Subasta exitosa',
      auctionFailed: 'Subasta fallida',
      currentBid: 'Oferta actual',
      minimumBid: 'Oferta mínima',
    },
    auctionEnd: 'Fin de la subasta',
    featuredItem: 'Artículo destacado',
    experimentalServer: '¡Este es un servidor experimental!',
    transferAvailable: 'Transferencia de servidor común disponible',
    transferUnavailable: 'Transferencia de servidor común NO disponible',
    Tooltips: {
      labels: {
        imbuements: 'Lista de imbuements',
        charms: 'Lista de charms',
        quests: 'Lista de quests',
        supremeGems: 'Available supreme gem modifiers',
      },
      quests: {
        utilitary: 'Útiles',
        access: 'Accesos',
        boss: 'Bosses',
        other: 'Otros',
      },
    },
    tcInvested: {
      prefix: 'Este personaje ha invertido al menos',
      suffix: 'Tibia Coins en compras de la tienda',
      invested: 'invertido',
    },

    AuctionStatus: 'Estado de la subasta',
    BidStatus: 'Oferta actual',
    highlightLabelText: '¡Destaque su subasta!',
    CharacterModal: {
      totalInvested: 'Total invertido',
      SpriteBox: {
        firstAddon: 'Primer addon',
        secondAddon: 'Segundo addon',
      },
    },
  },
  StepperCompletedLabel: 'Paso completado',
  CopyButton: {
    toCopyLabel: 'Copiar',
    copiedLabel: 'Copiado',
  },
  Accordion: {
    open: 'Abrir',
    close: 'Cerrar',
  },
  Dialog: {
    close: 'Cerrar ventana',
  },
  FooterTitle: 'Exevo Pan - creado por',
  AnchorIconLabel: 'Copiar link',
  CharacterTooltipLabel: 'Ir a la página del personaje',
  Newsticker: 'Artículos recientes',
  SignIn: {},
  termsOfService: 'Terms of Service',
  privacyPolicy: 'Privacy Policy',
  SuggestedReading: {},
  RangeDatePicker: {
    currentMonthLabel: 'Mes actual',
    nextMonthLabel: 'Proximo mes',
  },
  genericError: '¡Ups! Algo salió mal',
  genericLoading: 'Cargando...',
  exevoProCTA: null,
  play: 'Jugar',
  SetupNotifications: {},
  AuctionEstimationAlerts: {},
  EstimatedPriceBox: {},
})
