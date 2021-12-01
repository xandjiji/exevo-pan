export default {
  Meta: {
    title: 'Exevo Pan - Leilões',
    description: 'Filtre e explore chares de Tibia no Char Bazaar oficial!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Abrir menu de filtros',
    sortingButtonLabel: 'Defina um critério de ordenação',
    filter: 'filtro',
    filters: 'filtros',
    is: 'está',
    are: 'estão',
    active: 'ativo',
    noItemsPagination: 'Nenhum personagem',
    filterDrawerLabel: 'Formulário de filtros',
    descendingSwitchLabel: 'Ordenar por ordem decrescente',
    descending: 'Decrescente',
    sortModes: {
      auctionEnd: 'Fim do leilão',
      level: 'Level',
      price: 'Preço',
      priceBidded: 'Preço (apenas com lance)',
    },
    noAuctionFound: 'Desculpe, nenhum leilão foi encontrado',
    changeFilters: 'Mudar filtros',
    notFoundAlt: 'Nenhum personagem foi encontrado',
  },
  FilterDrawer: {
    title: 'Filtros',
    labels: {
      searchNickname: 'Procurar nickname',
      vocation: 'Vocação',
      serverLocation: 'Localização do servidor',
      minSkill: 'Skill level mínimo',
      rareItems: 'Items raros',
      misc: 'Diversos',
    },
    placeholders: {
      server: 'Escolha um servidor',
      imbuements: 'Selecionar imbuements',
      charms: 'Selecionar charms',
      quests: 'Selecionar quests',
      rareItems: 'Escolha um item',
    },
    tooltips: {
      rareItems:
        'Se um item raro não estiver nesta lista é porque não há nenhum leilão com ele no momento.',
      rareNicknames:
        "Nicknames com caracteres especiais (äëïöüÿ'-.,), comprimento de 2-3 caracteres e letras maiúsculas consecutivas (e.g XVI)",
      soulwar: 'Personagens com nivel 250+ e com a Soul War não completada',
    },
    toggleAll: {
      imbuements: 'Todos os imbuements',
      charms: 'Todos os charms',
      items: 'Todos os items',
    },
    resetFilters: 'Resetar filtros',
    green: 'Verde',
    yellow: 'Amarelo',
    rareNicknamesButton: 'Nicknames raros',
    soulwarButton: 'Soulwar disponível',
    skullEmoji: 'caveira',
  },
}
