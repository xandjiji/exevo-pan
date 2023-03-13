export default {
  Meta: {
    title: 'Bosses',
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
    pin: 'Favorite this boss',
    unpin: 'Unfavorite this boss',
    listBosses: 'List bosses by:',
    exclusiveBosses: 'Exclusive {{exevopro}} bosses 🕵️',
    EmptyState: 'No bosses',
    listOptions: {
      chance: 'Chance',
      name: 'Name',
      lastSeen: 'Last seen',
      favorites: 'Favorites',
    },
  },
}
