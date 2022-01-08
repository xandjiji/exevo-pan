export default {
  Meta: {
    title: 'Exevo Pan - Subastas',
    description:
      '¡Filtra y explora los caracteres de Tibia en el Char Bazaar oficial!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Abrir menú de filtros',
    sortingButtonLabel: 'Definir un criterio de clasificación',
    filter: 'filtro',
    filters: 'filtros',
    is: 'está',
    are: 'son',
    active: 'activo',
    noItemsPagination: 'Sin personajes',
    filterDrawerLabel: 'Formulario de filtro',
    descendingSwitchLabel: 'Ordenar en orden descendente',
    descending: 'Decrescente',
    sortModes: {
      auctionEnd: 'Fin de la subasta',
      level: 'Level',
      price: 'Precio',
      priceBidded: 'Precio (apenas com oferta)',
    },
    noAuctionFound: 'Desculpa, no se encontró subasta',
    changeFilters: 'Cambiar filtros',
    notFoundAlt: 'No se encontraron caracteres',
  },
  FilterDrawer: {
    title: 'Filtros',
    labels: {
      searchNickname: 'Buscar nickname',
      vocation: 'Vocación',
      serverLocation: 'Ubicación del servidor',
      minSkill: 'Skill level mínimo',
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
      rareItems: 'Escoge uno item',
    },
    tooltips: {
      rareItems:
        'Si un artículo raro no está en esta lista, actualmente no hay subasta para él.',
      rareNicknames:
        "Nicknames con caracteres especiales (äëïöüÿ'-.,), tamaño de 2-3 caracteres y letras mayúsculas consecutivas (e.g XVI)",
      soulwar: 'Personajes con nivel 250+ e sin completar la Soul War',
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
    soulwarButton: 'Soulwar disponible',
    skullEmoji: 'cráneo',
    SpritePicker: {
      item: 'item está seleccionado',
      items: 'items estan seleccionados',
    },
  },
}
