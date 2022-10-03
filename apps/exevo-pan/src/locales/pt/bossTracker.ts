export default {
  Meta: {
    title: 'Boss Tracker',
    description: 'Descubra onde e quando bosses irão nascer!',
  },
  updated: {
    recently: 'Atualizado alguns minutos atrás',
    hoursAgo: {
      prefix: 'Atualizado',
      suffix: 'atrás',
    },
  },
  ServerNavigation: {
    label: 'Servidor selecionado:',
  },
  RecentlyAppeared: {
    title: 'Vistos recentemente',
    /* 'hours ago' */
    ago: 'atrás',
  },
  BossGrid: {
    listBosses: 'Listar bosses por',
    EmptyState: 'Nenhum boss',
    listOptions: {
      chance: 'Chance',
      name: 'Nome',
      lastSeen: 'Última vez visto',
      favorites: 'Favoritos',
    },
    BossCard: {
      lastSeen: 'Última vez visto',
      /* 'hours ago' */
      ago: 'atrás',
      thisCreatureHas: 'Essa criatura tem',
      differentSpawnLocations: 'locais diferentes de spawn.',
      itIs: 'É',
      possible: 'possível',
      toSpawn: 'nascer neste local.',
      thereAre: 'Faltam',
      /* days left */
      left: '',
      before: 'antes que ele possa nascer nesse local.',
      itsUpToYou: 'Cabe a você descobrir qual dos locais é este',
      chanceToSpawn: 'Chance de nascer hoje',
      unknown: 'Desconhecido',
      noChance: 'Sem chance',
      expectedIn: 'Aparecerá em',
    },
    BossDialog: {
      loot: 'Loot relevante',
      raidMessages: 'Mensagens de raid',
      bossWillSpawn: 'Boss irá nascer',
      location: 'Local',
      locations: 'Locais',
      /* 'using' TibiaMaps.io ❤️ */
      using: 'usando',
    },
  },
}
