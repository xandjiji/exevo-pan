// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/homepage'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
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
    TibiaTradeBanner: {
      heading: 'Presentado en {{link}}:',
      selling: 'Selling',
      buying: 'Buying',
    },
    separators: {},
    noAuctionFound: 'Disculpa, no se encontró ninguna subasta',
    noFavorites: null,
    changeFilters: 'Cambiar filtros',
    NotFoundAlert: null,
    ExpandableCharacterCard: {},
    useAuctionNotifications: {},
    EstimatedPriceDialog: {},
    EstimatedSkillDialog: {},
  },
  FilterControl: {
    rareNickname: 'Nicknames raros',
  },
  FilterDrawer: {
    title: 'Filtros',
    exevoProExclusive: null,
    labels: {
      searchNickname: 'Buscar nickname',
      vocation: 'Vocación',
      serverLocation: 'Ubicación del servidor',
      rareAchievements: 'Achievements raros',
      rareItems: 'Items raros',
      misc: 'Variados',
      minCharmPoints: 'Min charm points',
      maxCharmPoints: 'Max charm points',
    },
    placeholders: {
      server: 'Elige un servidor',
      imbuements: 'Seleccione imbuements',
      charms: 'Seleccione charms',
      gems: 'Seleccione supreme gems',
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
      item: 'item está seleccionado',
      items: 'items estan seleccionados',
    },
  },
})
