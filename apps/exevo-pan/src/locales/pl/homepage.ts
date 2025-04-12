// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/homepage'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
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
    TibiaTradeBanner: {
      heading: 'Featured on {{link}}:',
      selling: 'Selling',
      buying: 'Buying',
    },
    TibiaBountyBanner: {
      heading: 'Bounties at {{link}}:',
    },
    separators: {},
    noAuctionFound: 'Przepraszam, nie znaleziono aukcji',
    changeFilters: 'Zmień filtry',
  },
  FilterControl: {
    rareNickname: 'Rzadkie nazwa',
  },
  FilterDrawer: {
    title: 'Filtry',
    labels: {
      searchNickname: 'Szukaj nazwy',
      vocation: 'Klasa postaci',
      serverLocation: 'Serwer',
      rareItems: 'Rzadkie przedmioty',
      rareAchievements: 'Rzadkie osiągnięcia',
      misc: 'Różne',
    },
    placeholders: {
      server: 'Wybierz serwer',
      imbuements: 'Wybierz imbuementy',
      charms: 'Wybierz charmy',
      quests: 'Wybierz questy',
      gems: 'Wybierz supreme gems',
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
      item: 'Przedmiot jest wybrany',
      items: 'Przedmioty są wybrane',
    },
  },
})
