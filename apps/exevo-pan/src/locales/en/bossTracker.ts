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
    listBosses: 'List bosses by:',
    exclusiveBosses: 'Exclusive {{exevopro}} bosses 🕵️',
    EmptyState: 'No bosses',
    listOptions: {
      chance: 'Chance',
      name: 'Name',
      lastSeen: 'Last seen',
      favorites: 'Favorites',
    },
    BossCard: {
      lastSeen: 'Last seen',
      /* 'hours ago' */
      ago: 'ago',
      thisCreatureHas: 'This creature has',
      differentSpawnLocations: 'different spawn locations.',
      itIs: 'It is',
      possible: 'possible',
      toSpawn: 'to spawn at this spot.',
      thereAre: 'There are',
      /* days left */
      left: 'left',
      before: 'before it can spawn at this spot.',
      itsUpToYou: "It's up to you to figure out which spot this is",
      chanceToSpawn: 'Chance to spawn today',
      unknown: 'Unknown',
      noChance: 'No chance',
      expectedIn: 'Expected in',
      pin: 'Favorite this boss',
      unpin: 'Unfavorite this boss',
    },
    BossDialog: {
      loot: 'Relevant loot',
      raidMessages: 'Raid messages',
      bossWillSpawn: 'Boss will spawn',
      location: 'Location',
      locations: 'Locations',
      /* 'using' TibiaMaps.io ❤️ */
      using: 'using',
      descriptions: {
        Grorlam: 'Several spots inside Mount Sternum (Thais)',
      },
    },
  },
}
