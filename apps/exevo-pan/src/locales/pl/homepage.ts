export default {
  Meta: {
    title: 'Exevo Pan - Obecje aukcje',
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
    notFoundAlt: 'Nie znaleziono postaci',
  },
  FilterDrawer: {
    title: 'Filtry',
    labels: {
      searchNickname: 'Szukaj nazwy',
      vocation: 'Klasa postaci',
      serverLocation: 'Serwer',
      minSkill: 'Minimalny level skilla',
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
      soulwar:
        'Postacie z poziomem 250+ które nie mają ukończonego Soul War questa',
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
    soulwarButton: 'Dostępny Soulwar',
    skullEmoji: 'Czaszka',
    SpritePicker: {
      item: 'Przedmiot jest wybrany',
      items: 'Przedmioty są wybrane',
    },
  },
}
