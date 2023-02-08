export default {
  Meta: {
    title: 'Char Bazaar',
    description:
      'Filter en zoek naar Tibia-karakters op de officiële Char Bazaar!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Open filter UI',
    sortingButtonLabel: 'Stel sorteeropties en -criteria in',
    filter: 'filter',
    filters: 'filters',
    is: 'is',
    are: 'zijn',
    active: 'actief',
    noItemsPagination: 'Geen karakters gevonden',
    filterDrawerLabel: 'Filter UI',
    descendingSwitchLabel: 'Sorteer aflopend',
    descending: 'Aflopend',
    sortModes: {
      auctionEnd: 'Einde Veiling',
      level: 'Level',
      price: 'Prijs',
      priceBidded: 'Prijs (enkel biedingen)',
    },
    noAuctionFound: 'Sorry, geen veiling gevonden',
    changeFilters: 'Wijzig filters',
  },
  FilterDrawer: {
    title: 'Filters',
    exevoProExclusive: '(exclusief voor {{exevopro}})',
    labels: {
      bazaarHistory: 'Bazaar History',
      searchNickname: 'Zoek nickname',
      vocation: 'Vocation',
      serverLocation: 'Server-locatie',
      storeItems: 'Store items',
      minSkill: 'Minimum skill-level',
      tcInvested: 'Tibia Coins geïnvesteerd',
      biddedOnly: 'Enkel biedingen',
      rareItems: 'Zeldzame items',
      rareAchievements: 'Zeldzame achievements',
      misc: 'Allerlei',
    },
    placeholders: {
      server: 'Kies een server',
      imbuements: 'Selecteer imbuements',
      charms: 'Selecteer charms',
      quests: 'Selecteer quests',
      achievements: 'Selecteer achievements',
      rareItems: 'Kies een item',
    },
    tooltips: {
      rareItems:
        'Als een zeldzaam item niet in deze lijst staat, geeft dat aan dat er geen veilingen zijn met dit item.',
      rareNicknames:
        "Nicknames met speciale karakters (äëïöüÿ'-.,), namen met slechts 2–3 karakters, en opeenvolgende hoofdletters (e.g XVI)",
    },
    toggleAll: {
      imbuements: 'Alle imbuements',
      charms: 'Alle charms',
      items: 'Alle items',
    },
    resetFilters: 'Reset filters',
    green: 'Green',
    yellow: 'Yellow',
    rareNicknamesButton: 'Zeldzame nicknames',
    skullEmoji: 'skull',
    SpritePicker: {
      item: 'item is geselecteerd',
      items: 'items zijn geselecteerd',
    },
  },
}
