export default {
  Meta: {
    title: 'Boss Tracker',
    description: 'Ontdek waar en wanneer bosses zullen spawnen!',
  },
  updated: {
    recently: 'Een paar minuten geleden geüpdatet',
    hoursAgo: {
      prefix: 'Laatste update:',
      suffix: 'geleden',
    },
  },
  ServerNavigation: {
    label: 'Huidige server:',
  },
  RecentlyAppeared: {
    title: 'Onlangs gezien',
    /* 'hours ago' */
    ago: 'geleden',
  },
  BossGrid: {
    listBosses: 'Filter bosses',
    exclusiveBosses: 'Exclusieve {{exevopro}} bosses 🕵️',
    EmptyState: 'Geen bosses',
    listOptions: {
      chance: 'Kans',
      name: 'Naam',
      lastSeen: 'Laatst gezien',
      favorites: 'Favorieten',
    },
    BossCard: {
      lastSeen: 'Laatst gezien',
      /* 'hours ago' */
      ago: 'geleden',
      thisCreatureHas: 'Deze baas heeft',
      differentSpawnLocations: 'verschillende spawn-locaties.',
      itIs: 'De baas kan',
      possible: 'mogelijk',
      toSpawn: 'om op deze plek spawnen.',
      thereAre: 'Er zijn nog',
      /* days left */
      left: 'te gaan',
      before: 'alvorens de baas opnieuw op deze plek kan spawnen.',
      itsUpToYou: 'Het is aan jou om uit te zoeken welke plek dit is',
      chanceToSpawn: 'Kans om vandaag te spawnen',
      unknown: 'Onbekend',
      noChance: 'Geen kans',
      expectedIn: 'Verwacht over',
    },
    BossDialog: {
      loot: 'Relevante loot',
      raidMessages: 'Raid-aankondigingen',
      bossWillSpawn: 'Boss zal spawnen',
      location: 'Locatie',
      locations: 'Locaties',
      /* 'using' TibiaMaps.io ❤️ */
      using: 'met dank aan',
    },
  },
}
