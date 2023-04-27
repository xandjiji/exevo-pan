export default {
  Meta: {
    title: 'Subastas',
    description:
      '¡Filtra y explora los caracteres de Tibia en el Char Bazaar oficial!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Abrir menú de filtros',
    sortingButtonLabel: 'Definir un criterio de ordenación',
    filter: 'filtro',
    filters: 'filtros',
    is: 'está',
    are: 'son',
    active: 'activo',
    noItemsPagination: 'Sin personajes',
    filterDrawerLabel: 'Formulario de filtro',
    descendingSwitchLabel: 'Ordenar en orden descendente',
    descending: 'Descendente',
    sortModes: {
      auctionEnd: 'Fin de la subasta',
      level: 'Level',
      price: 'Precio',
      priceBidded: 'Precio (solo con oferta)',
    },
    separators: {
      /* @ ToDo: i18n */
      current: 'Current auctions',
      history: 'Bazaar history',
    },
    noAuctionFound: 'Disculpa, no se encontró ninguna subasta',
    /* @ ToDo: i18n */
    noFavorites: 'No favorited auctions',
    changeFilters: 'Cambiar filtros',
    NotFoundAlert:
      "The following auctions aren't available yet on our database:",
    /* @ ToDo: i18n */
    ExpandableCharacterCard: {
      details: 'Details',
      copyLink: 'Copy link',
      findSimilar: 'Find similar',
      notify: 'Notify',
      favorite: {
        add: 'Favorite',
        remove: 'Unfavorite',
        added: 'Added to favorites',
        removed: 'Removed from favorites',
      },
      estimate: 'Estimate price',
    },
    /* @ ToDo: i18n */
    useAuctionNotifications: {
      heading: 'Set auction notification',
      bidNotification: 'Notify me when bidded',
      proExclusive: '(exclusive for {{exevopro}})',
      timeNotification: 'Notify me before auction end:',
      minutesLeft: 'Minutes left',
      hoursLeft: 'Hours left',
      cancelButton: 'Cancel',
      confirmButton: 'Confirm',
      success: 'Notification was set!',
    },
    EstimatedPriceDialog: {
      heading: 'Estimated auction price',
      goToCalculator: 'Estimate more prices with our {{calculatorPage}}',
      calculatorPage: 'auction price calculator',
    },
  },
  FilterControl: {
    /* @ ToDo: i18n */
    modes: {
      current: 'Current auctions',
      history: 'Bazaar history',
      favorites: 'Favorites',
    },
    /* @ ToDo: i18n */
    biddedOnly: 'Bidded only',
    /* @ ToDo: i18n */
    invested: 'invested',
    /* @ ToDo: i18n */
    allImbuements: 'All imbuements',
    /* @ ToDo: i18n */
    allCharms: 'All charms',
    rareNickname: 'Nicknames raros',
  },
  FilterDrawer: {
    title: 'Filtros',
    exevoProExclusive: '(exclusive for {{exevopro}})',
    labels: {
      searchNickname: 'Buscar nickname',
      vocation: 'Vocación',
      serverLocation: 'Ubicación del servidor',
      storeItems: 'Store items',
      minSkill: 'Skill level mínimo',
      /* @ ToDo: i18n */
      tcInvested: 'Tibia Coins invested',
      /* @ ToDo: i18n */
      biddedOnly: 'Bidded only',
      rareAchievements: 'Achievements raros',
      rareItems: 'Items raros',
      misc: 'Variados',
    },
    placeholders: {
      server: 'Elige un servidor',
      imbuements: 'Seleccione imbuements',
      charms: 'Seleccione charms',
      quests: 'Seleccione quests',
      achievements: 'Seleccione achievements',
      rareItems: 'Escoge un item',
    },
    tooltips: {
      rareItems:
        'Si un artículo raro no está en esta lista, actualmente no hay subasta para él.',
      rareNicknames:
        "Nicknames con caracteres especiales (äëïöüÿ'-.,), tamaño de 2-3 caracteres y letras mayúsculas consecutivas (e.g XVI)",
    },
    toggleAll: {
      imbuements: 'Todos los imbuements',
      charms: 'Todos los charms',
      items: 'Todos los items',
    },
    resetFilters: 'Resetar filtros',
    green: 'Verde',
    yellow: 'Amarillo',
    rareNicknamesButton: 'Nicknames raros',
    skullEmoji: 'cráneo',
    SpritePicker: {
      /* @ ToDo: i18n */
      search: 'Search by name',
      item: 'item está seleccionado',
      items: 'items estan seleccionados',
    },
  },
}
