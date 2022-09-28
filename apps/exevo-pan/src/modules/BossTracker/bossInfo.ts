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
      description: 'Isle of Mists (Plains of Havoc)',
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

bossInfo.set('Hairman the Huge', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32846,32509,8:1',
      description: 'Banuta (Port Hope)',
    },
  ],
})

bossInfo.set('Hatebreeder', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33085,31103,14:1',
      description: 'WOTE (Farmine)',
    },
  ],
})

bossInfo.set('High Templar Cobrass', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32957,32850,8:1',
      description: 'Chor (Port Hope)',
    },
  ],
})

bossInfo.set('Hirintror', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32145,31257,10:4',
      description: 'Formorgar Mines (Svargrond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32366,31053,8:4',
      description: 'Nibelor (Svargrond)',
    },
  ],
})

bossInfo.set('Mahatheb', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33390,31702,13:1',
      description: 'Forgotten Tomb (Ankrahmun)',
    },
  ],
})

bossInfo.set('Man in the Cave', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32133,31147,2:1',
      description: 'Svargrond',
    },
  ],
  loot: ['Fur Cap'],
})

bossInfo.set('Massacre', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32872,32280,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ['Great Shield', 'Heavy Mace', "Piece of Massacre's Shell"],
})

bossInfo.set('Maw', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33506,31246,8:1',
      description: 'The Hive (Gray Beach)',
    },
  ],
})

bossInfo.set('Midnight Panther', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32854,32744,7:1',
      description: 'Tiquanda (Port hope)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32831,32706,7:1',
      description: 'Tiquanda (Port hope)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32886,32721,7:1',
      description: 'Tiquanda (Port hope)',
    },
  ],
})

bossInfo.set('Mindmasher', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33457,31222,8:1',
      description: 'The Hive (Gray Beach)',
    },
  ],
})

bossInfo.set('Morgaroth', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32061,32615,14:1',
      description: 'Goroma (Liberty Bay)',
    },
  ],
  loot: [
    "Morgaroth's Heart",
    'Teddy Bear',
    'Molten Plate',
    "Dark Lord's Cape",
    'Great Shield',
    'Thunder Hammer',
    'The Stomper',
    'The Devileye',
    'Chain Bolter',
  ],
})

bossInfo.set('Morshabaal', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33118,31700,7:1',
      description: 'Edron',
    },
  ],
  loot: [
    "Morshabaal's Brain",
    "Morshabaal's Extract",
    "Morshabaal's Mask",
    'Green Demon Legs',
    'Green Demon Helmet',
    'Green Demon Armor',
    'Green Demon Slippers',
    'Thunder Hammer',
  ],
})

bossInfo.set('Mr. Punish', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32775,32233,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ['Impaler', "Ravager's Axe", "Mr. Punish's Handcuffs"],
})

bossInfo.set('Munster', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32102,32217,9:1',
      description: 'Rat Cave (Rookgaard)',
    },
  ],
  loot: ['Cookie', 'Die'],
})

bossInfo.set('Ocyakao', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32351,31052,7:1',
      description: 'Nibelor (Svargrond)',
    },
  ],
  loot: ['Eye of the Storm'],
})

bossInfo.set('Omrafir', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33589,32379,12:1',
      description: 'Roshamuul Prison (Roshamuul)',
    },
  ],
  loot: [
    'Dream Warden Mask',
    'Eye Pod',
    'Nightmare Horn',
    'Nightmare Hook',
    'Psychedelic Tapestry',
  ],
})

bossInfo.set('Oodok Witchmaster', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32887,32787,7:1',
      description: 'Hunter Camp (Port Hope)',
    },
  ],
})

bossInfo.set('Orshabaal', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33118,31700,7:1',
      description: 'Edron',
    },
  ],
  loot: ["Orshabaal's Brain", 'Teddy Bear', 'Thunder Hammer'],
})

bossInfo.set('Rotspit', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33450,31228,8:1',
      description: 'The Hive (Gray Beach)',
    },
  ],
})

bossInfo.set('Rottie the Rotworm', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32180,32149,11:2',
      description: 'Katana Quest (Rookgaard)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#31975,32066,13:2',
      description: 'Poison Spider Cave (Rookgaard)',
    },
  ],
})

bossInfo.set('Rotworm Queen', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33046,32373,9:1',
      description: 'Rotworm Cave (Darashia)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32263,32689,10:1',
      description: 'Rotworm Cave (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33250,31859,9:1',
      description: 'Rotworm Cave (Edron)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32769,31599,12:1',
      description: "Hellgate (Ab'Dendriel)",
    },
  ],
})

bossInfo.set('Rukor Zad', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32769,31599,12:1',
      description: 'Dark Cathedral (Plains of Havoc)',
    },
  ],
})

bossInfo.set('Shadowstalker', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33480,31233,8:2',
      description: 'The Hive (Gray Beach)',
    },
  ],
})

bossInfo.set('Shlorg', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33169,31732,9:1',
      description: 'Earth Elemental Cave (Edron)',
    },
  ],
  loot: ['Glass of Goo', 'Goo Shell'],
})

bossInfo.set('Sir Valorcrest', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33266,31768,10:1',
      description: 'Undead Cave (Edron)',
    },
  ],
  loot: ['Vampire Lord Token'],
})

bossInfo.set('Smuggler Baron Silvertoe', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32541,32648,10:4',
      description: 'Bandit Caves (Port Hope)',
    },
  ],
})

bossInfo.set('Teleskor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#31981,32246,10:4',
      description: 'Premium Area (Rookgaard)',
    },
  ],
})

bossInfo.set('The Abomination', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32430,31027,15:1',
    },
  ],
  loot: [
    'Fiery Horseshoe',
    "Abomination's Eye",
    "Abomination's Tongue",
    "Abomination's Tail",
  ],
})

bossInfo.set('The Big Bad One', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33173,31678,7:1',
      description: 'Edron',
    },
  ],
})

bossInfo.set('The Blightfather', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33306,31154,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('The Evil Eye', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32806,31611,14:1',
      description: "Hellgate Library (Ab'Dendriel)",
    },
  ],
})

bossInfo.set('The Frog Prince', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32383,32128,7:1',
      description: 'Alatar Lake (Thais)',
    },
  ],
})

bossInfo.set('The Handmaiden', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32786,32294,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ["The Handmaiden's Protector"],
})

bossInfo.set('The Hungerer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32155,32862,9:2',
      description: 'Hive Outpost (Liberty Bay)',
    },
  ],
})

bossInfo.set('The Imperor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32891,32236,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ['Tempest Shield', "The Imperor's Trident"],
})

bossInfo.set('The Manhunter', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32167,32865,9:1',
      description: 'Hive Outpost (Liberty Bay)',
    },
  ],
})

bossInfo.set('The Mean Masher', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32167,32865,9:1',
      description: 'Hive Outpost (Liberty Bay)',
    },
  ],
})

bossInfo.set('The Old Whopper', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33313,31667,11:1',
      description: 'Cyclopolis (Edron)',
    },
  ],
})

bossInfo.set('The Pale Count', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32966,32421,14:1',
      description: 'Drefia (Darashia)',
    },
  ],
  loot: ['Vampire Lord Token'],
})

bossInfo.set('The Plasmother', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32846,32341,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ["The Plasmother's Remains"],
})

bossInfo.set('The Voice Of Ruin', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33313,31132,9:1',
      description: 'Corruption Hole (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33280,31087,9:1',
      description: 'Corruption Hole (Farmine)',
    },
  ],
})

bossInfo.set('The Welter', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33027,32658,5:1',
      description: 'Tiquanda (Port Hope)',
    },
  ],
  loot: ['Triple Bolt Crossbow', 'Shrunken Head Necklace'],
})

bossInfo.set('Tyrn', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33051,32393,14:1',
      description: 'Drefia (Darashia)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32442,32851,9:2',
      description: 'Wyrm Cave (Liberty Bay)',
    },
  ],
  loot: ['Sun Mirror'],
})

bossInfo.set('Tzumrah The Dazzler', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33326,32657,11:1',
      description: 'Forbidden Temple (Ankrahmun)',
    },
  ],
})

bossInfo.set('Undead Cavebear', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#31977,32559,10:1',
      description: 'Lich Hell (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#31965,32591,10:1',
      description: 'Lich Hell (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#31913,32560,10:1',
      description: 'Lich Hell (Liberty Bay)',
    },
  ],
})

bossInfo.set('Warlord Ruzad', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32976,31717,5:1',
      description: 'Orc Fortress (Kazordoon)',
    },
  ],
})

bossInfo.set('White Pale', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33268,31872,10:1',
      description: 'Rotworm Cave (Edron)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33131,32430,9:1',
      description: 'Rotworm Cave (Darashia)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32225,32760,10:1',
      description: 'Rotworm Cave (Liberty Bay)',
    },
  ],
  loot: ['Albino Plate', 'Horn (Ring)'],
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
