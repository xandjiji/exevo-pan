export default {
  Meta: {
    title: 'Bosses',
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
    listBosses: 'Listar bosses por:',
    exclusiveBosses: 'Bosses exclusivos {{exevopro}} 🕵️',
    EmptyState: 'Nenhum boss',
    listOptions: {
      chance: 'Chance',
      name: 'Nome',
      lastSeen: 'Última vez visto',
      favorites: 'Favoritos',
    },
    BossDialog: {
      loot: 'Loot relevante',
      raidMessages: 'Mensagens de raid',
      bossWillSpawn: 'Boss irá nascer',
      location: 'Local',
      locations: 'Locais',
      /* 'using' TibiaMaps.io ❤️ */
      using: 'usando',
      descriptions: {
        Grorlam: 'Várias localizações dentro de Mount Sternum (Thais)',
      },
    },
  },
}
