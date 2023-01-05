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
    noAuctionFound: 'Przepraszam, nie znaleziono aukcji',
    changeFilters: 'Zmień filtry',
    /* @ ToDo: i18n */
    ExpandableCharacterCard: {
      details: 'Details',
      copyLink: 'Copy link',
      findSimilar: 'Find similar',
    },
  },
  FilterDrawer: {
    title: 'Filtry',
    exevoProExclusive: '(exclusive for {{exevopro}})',
    labels: {
      bazaarHistory: 'Historia Bazaru',
      searchNickname: 'Szukaj nazwy',
      vocation: 'Klasa postaci',
      serverLocation: 'Serwer',
      storeItems: 'Store items',
      minSkill: 'Minimalny level skilla',
      /* @ ToDo: i18n */
      tcInvested: 'Tibia Coins invested',
      /* @ ToDo: i18n */
      biddedOnly: 'Bidded only',
      rareItems: 'Rzadkie przedmioty',
      rareAchievements: 'Rzadkie osiągnięcia',
      misc: 'Różne',
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
