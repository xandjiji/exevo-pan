export default {
  Meta: {
    title: 'Exevo Pan - Obecne aukcje',
    description: 'Filtruj i szukaj aukcji na Oficjalnym Bazarze Tibijskim!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Otwórz schowej filtrowania',
    sortingButtonLabel: 'Ustaw rodzaj sortowania oraz kryteria',
    filter: 'Filtr',
    filters: 'Filtry',
    is: 'Jest',
    are: 'są',
    active: 'Aktywny',
    noItemsPagination: 'Nie znaleziono postaci',
    filterDrawerLabel: 'Rodzaj filtru',
    descendingSwitchLabel: 'Sortuj malejąco',
    descending: 'Malejąco',
    sortModes: {
      auctionEnd: 'Koniec aukcji',
      level: 'Level',
      price: 'Cena',
      priceBidded: 'Cena (Tylko ze złożonymi ofertami)',
    },
    separators: {
      /* @ ToDo: i18n */
      current: 'Current auctions',
      history: 'Bazaar history',
    },
    noAuctionFound: 'Przepraszam, nie znaleziono aukcji',
    /* @ ToDo: i18n */
    noFavorites: 'No favorited auctions',
    changeFilters: 'Zmień filtry',
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
      estimatePrice: 'Estimate price',
      estimateSkills: 'Estimate skills',
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
    SkillDialog: {
      heading: 'Character skills',
      loyaltyPoints: 'points',
      none: 'None',
      skillValue: 'Skill value',
      tooltip: 'Required cost to achieve this skill using',
      skillWithLoyalty: 'Skill with bonus Loyalty',
      externalCalculator:
        'Experiment with this character in our skills calculator',
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
    rareNickname: 'Rzadkie nazwa',
  },
  FilterDrawer: {
    title: 'Filtry',
    exevoProExclusive: '(exclusive for {{exevopro}})',
    labels: {
      searchNickname: 'Szukaj nazwy',
      vocation: 'Klasa postaci',
      serverLocation: 'Serwer',
      storeItems: 'Store items',
      /* @ ToDo: i18n */
      tcInvested: 'Tibia Coins invested',
      /* @ ToDo: i18n */
      biddedOnly: 'Bidded only',
      rareItems: 'Rzadkie przedmioty',
      rareAchievements: 'Rzadkie osiągnięcia',
      misc: 'Różne',
      minCharmPoints: 'Min charm points',
      maxCharmPoints: 'Max charm points',
    },
    placeholders: {
      server: 'Wybierz serwer',
      imbuements: 'Wybierz imbuementy',
      charms: 'Wybierz charmy',
      quests: 'Wybierz questy',
      achievements: 'Wybierz osiągnięcia',
      rareItems: 'Wybierz przedmiot',
    },
    tooltips: {
      rareItems:
        'Jeśli rzadkiego przedmioty nie ma na tej liście, oznacza to, że nie ma żadnych aukcji na których się znajduję.',
      rareNicknames:
        "Nazwy ze specjalnymi znakami (äëïöüÿ'-.,), 2-3 literowe nazwy oraz same duże litery (t.j XVI)",
    },
    toggleAll: {
      imbuements: 'Wszystkie Imbuementy',
      charms: 'Wszystkie Charmy',
      items: 'Wszystkie Przedmioty',
    },
    resetFilters: 'Ustaw domyślne',
    green: 'Zielony',
    yellow: 'Żółty',
    rareNicknamesButton: 'Rzadkie nazwy postaci',
    skullEmoji: 'Czaszka',
    SpritePicker: {
      /* @ ToDo: i18n */
      search: 'Search by name',
      item: 'Przedmiot jest wybrany',
      items: 'Przedmioty są wybrane',
    },
  },
}
