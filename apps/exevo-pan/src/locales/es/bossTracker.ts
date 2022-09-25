export default {
  Meta: {
    title: 'Boss Tracker',
    description: 'Find out where and when bosses will spawn!',
  },
  updated: {
    recently: 'Updated a few minutes ago',
    hoursAgo: {
      prefix: 'Updated',
      suffix: 'ago',
    },
  },
  ServerNavigation: {
    label: 'Current server:',
  },
  RecentlyAppeared: {
    title: 'Recently appeared',
    /* 'hours ago' */
    ago: 'ago',
  },
  BossGrid: {
    listBosses: 'List bosses by',
    EmptyState: 'No bosses',
    listOptions: {
      chance: 'Chance',
      name: 'Name',
      lastSeen: 'Last seen',
      favorites: 'Favorites',
    },
  },
}
