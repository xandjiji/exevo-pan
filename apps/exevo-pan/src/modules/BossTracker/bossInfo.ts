import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'

/* @ ToDo:
    <Description /> -> locales
*/

export const bossInfo = new Map<TrackedBossName, BossInfo>()

bossInfo.set('Apprentice Sheng', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32130,32059,12:1',
      description: 'Minotaur Hell (Rookgaard)',
    },
  ],
  loot: ['Magic Light Wand', 'Knife'],
})

bossInfo.set('Arachir the Ancient One', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32969,32399,12:1',
      description: 'Drefia (Darashia)',
    },
  ],
  loot: ['Vampire Lord Token'],
})

bossInfo.set('Arthom The Hunter', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32887,32787,7:1',
      description: 'Hunter Camp (Port Hope)',
    },
  ],
})

bossInfo.set('Barbaria', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32022,31386,7:1',
      description: 'Barbarian Camp, Krimhorn (Svargrond)',
    },
  ],
})

bossInfo.set('Battlemaster Zunzu', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33208,31241,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33284,31241,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('Big Boss Trolliver', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33134,31721,10:1',
      description: 'Troll Cave (Edron)',
    },
  ],
})

bossInfo.set('Burster', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32449,32416,10:1',
      description: 'Otherworld (Kazordoon)',
    },
  ],
})

bossInfo.set('Captain Jones', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33321,32183,7:1',
      description: 'Ghost Ship (Darashia)',
    },
  ],
})

bossInfo.set('Chizzoron the Distorter', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33351,31609,2:1',
      description: 'Zzaion (Farmine)',
    },
  ],
})

bossInfo.set('Chopper', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33522,31254,8:1',
      description: 'The Hive (Gray Beach)',
    },
  ],
})

bossInfo.set('Countess Sorrow', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32794,32363,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ['Silver Mace', "Countess Sorrow's Frozen Tear"],
})

bossInfo.set('Crustacea Gigantica', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32181,32939,9:2',
      description: 'Treasure Island (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32113,32733,12:2',
      description: 'Calassa (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32114,32804,12:2',
      description: 'Calassa (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33517,31804,15:2',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33471,31654,15:2',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33507,31635,14:2',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33534,31658,15:2',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33555,31788,14:2',
      description: 'Seacrest Grounds (Oramond)',
    },
  ],
})

bossInfo.set('Cublarc the Plunderer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33090,31391,7:2',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33327,31472,7:2',
      description: 'Zzaion (Farmine)',
    },
  ],
  loot: ['Disgusting Trophy'],
})

bossInfo.set('Dharalion', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33040,32177,9:1',
      description: 'Shadowthorn (Venore)',
    },
  ],
  loot: ['Cornucopia'],
})

bossInfo.set('Diblis the Fair', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32008,32793,10:1',
      description: 'Nargor Undead Cave (Liberty Bay)',
    },
  ],
  loot: ['Vampire Lord Token'],
})

bossInfo.set('Dracola', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32838,32307,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ["Reaper's Axe", "Dracola's Eye"],
})

bossInfo.set('Draptor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33189,31236,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33215,31228,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33234,31186,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33286,31251,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33253,31162,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33291,31158,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33333,31188,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33110,31079,10:1',
      description: 'Razachai (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33058,31116,10:1',
      description: 'Razachai (Farmine)',
    },
  ],
})

bossInfo.set('Dreadful Disruptor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32021,31379,11:2',
      description: 'Otherworld (Edron)',
    },
  ],
})

bossInfo.set('Dreadmaw', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33270,31164,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('Fernfang', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32854,32333,7:1',
      description: 'Isle of Mists (Pains of Havoc)',
    },
  ],
  loot: ['Wooden Whistle'],
})

bossInfo.set('Ferumbras', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32121,32687,4:1',
      description: "Ferumbras' Citadel (Goroma)",
    },
  ],
  loot: [
    'Teddy Bear',
    'Spellbook of Dark Mysteries',
    'Skullcrusher',
    'Demonwing Axe',
    'Great Axe',
    'Impaler',
    'Ornamented Axe',
    'Havoc Blade',
    'Tempest Shield',
    'Phoenix Shield',
    'Great Shield',
    "Ferumbras' Hat",
  ],
})

bossInfo.set('Flamecaller Zazrak', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33180,31220,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('Fleabringer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33092,31384,8:2',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33112,31457,8:2',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33251,31423,7:2',
      description: 'Zao Steppe (Farmine)',
    },
  ],
})

bossInfo.set('Foreman Kneebiter', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32553,31897,14:2',
      description: 'Dwarf Mines (Kazordoon)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32555,31880,15:1',
      description: 'Dwarf Mines (Kazordoon)',
    },
  ],
})

bossInfo.set('Furyosa', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33314,31842,15:1',
      description: 'Fury Gate (Edron)',
    },
  ],
  loot: ['Furious Frock', 'Phoenix Shield'],
})

bossInfo.set("Gaz'haragoth", {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33630,32372,5:1',
      description: 'Roshamuul Prison (Roshamuul)',
    },
  ],
  loot: [
    'Dream Warden Mask',
    'Dream Warden Claw',
    'Eye Pod',
    'Nightmare Beacon',
    'Nightmare Horn',
    'Nightmare Hook',
    'Psychedelic Tapestry',
    'Umbral Master Spellbook',
    'Umbral Master Hammer',
    'Umbral Master Mace',
    'Umbral Master Crossbow',
    'Umbral Master Bow',
    'Umbral Master Slayer',
    'Umbral Masterblade',
    'Umbral Master Chopper',
    'Umbral Master Axe',
  ],
})

bossInfo.set('General Murius', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32414,32119,15:1',
      description: 'Mintwallin (Thais)',
    },
  ],
})

bossInfo.set('Ghazbaran', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32227,31157,15:1',
      description: 'Formorgar Mines (Svargrond)',
    },
  ],
  loot: [
    'Blue Tome',
    'Teddy Bear',
    'Robe of the Ice Queen',
    'Golden Boots',
    'Spellbook of Dark Mysteries',
    'Havoc Blade',
    'Ravenwing',
    'Mythril Axe',
    'Twin Axe',
    'Demonbone',
  ],
})

bossInfo.set('Grand Mother Foulscale', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33309,31173,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('Grandfather Tridian', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32413,32778,11:1',
      description: 'Cult Cave (Liberty Bay)',
    },
  ],
})

bossInfo.set('Gravelord Oshuran', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32979,32395,12:1',
      description: 'Drefia (Darashia)',
    },
  ],
})

bossInfo.set('Groam', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32629,32020,10:1',
      description: 'Sunken Mines (Kazordoon)',
    },
  ],
})

bossInfo.set('Grorlam', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32380,32078,10:2',
      description: 'Thais Northern Dungeon (Thais)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32442,32019,11:2',
      description: 'Mount Sternum (Thais)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32422,32000,15:2',
      description: 'Mount Sternum (Thais)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32412,31991,13:2',
      description: 'Mount Sternum (Thais)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32427,32030,13:2',
      description: 'Mount Sternum (Thais)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32425,32022,14:2',
      description: 'Mount Sternum (Thais)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32429,32003,13:2',
      description: 'Mount Sternum (Thais)',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})

bossInfo.set('', {
  locations: [
    {
      src: '',
      description: '',
    },
  ],
})
