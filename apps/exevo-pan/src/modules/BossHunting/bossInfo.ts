import {
  constTokens as bossTokens,
  TrackedBossName,
} from 'data-dictionary/dist/dictionaries/bosses'
import { bossSet } from './blacklist'

export const bossInfo = new Map<TrackedBossName, BossInfo>()

bossInfo.set('Albino Dragon', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33090,32594,5:1',
      description: 'Dragon Lair (Ankrahmun)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33156,31270,5:1',
      description: 'Dragon Lair (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32592,31383,15:1',
      description: 'Dragon Lair (Fenrock)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32086,32566,14:1',
      description: 'Dragon Lair (Goroma)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32770,32311,12:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ['Albino Dragon Leather'],
})

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
      src: 'https://tibiamaps.io/map/embed#32007,31415,7:1',
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
      src: 'https://tibiamaps.io/map/embed#33237,31240,7:1',
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
  loot: ['Crystal Boots'],
  raidMessages: [
    {
      time: '00:00:00',
      message: 'A massive orc force is gathering at the gates of Zzaion.',
      style: 'REGULAR',
    },
    {
      time: '00:03:00',
      message:
        'Orc reinforcements have arrived at the gates of Zzaion! The gates are under heavy attack!',
      style: 'REGULAR',
    },
    {
      time: '00:05:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:07:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:10:00',
      message:
        'More orc reinforcements have arrived at the gates of Zzaion! The gates are under heavy attack!',
      style: 'REGULAR',
    },
    {
      time: '00:11:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:13:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:15:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:17:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:19:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:20:00',
      message:
        'The gates to Zzaion have been breached! Orcs are invading the city!',
      style: 'REGULAR',
    },
    {
      time: '00:30:00',
      message:
        'More orcs have arrived in Zzaion! The city is under attack! Strong lizard leaders have come to defend the city.',
      style: 'HIGHLIGHT',
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
      src: 'https://tibiamaps.io/map/embed#32181,32939,9:1',
      description: 'Treasure Island (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32113,32733,12:1',
      description: 'Calassa (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32114,32804,12:1',
      description: 'Calassa (Liberty Bay)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33517,31804,15:1',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33471,31654,15:1',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33507,31635,14:1',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33534,31658,15:1',
      description: 'Seacrest Grounds (Oramond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33555,31788,14:1',
      description: 'Seacrest Grounds (Oramond)',
    },
  ],
})

bossInfo.set('Cublarc the Plunderer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33090,31391,7:1',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33229,31428,7:1',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33317,31453,7:1',
      description: 'Zzaion (Farmine)',
    },
  ],
  loot: ['Disgusting Trophy'],
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'An orcish horde, ready for murder and plunder, is amassing to begin its travel through the steppes of Zao. Beware!',
      style: 'REGULAR',
    },
    {
      time: '00:05:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
    {
      time: '00:10:00',
      message: 'The great march of the orcish horde has begun!',
      style: 'REGULAR',
    },
    {
      time: '00:12:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:16:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:18:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
    {
      time: '00:30:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
  ],
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
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'The dragons of the Dragonblaze Mountains have descended to Zao to protect the lizardkin!',
      style: 'REGULAR',
    },
    {
      time: '00:15:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
    {
      time: '00:20:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
    {
      time: '00:25:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Dreadful Disruptor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32021,31379,11:1',
      description: 'Otherworld (Edron)',
    },
  ],
})

bossInfo.set('Dreadmaw', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33270,31163,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33296,31149,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('Elvira Hammerthrust', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32531,31926,11:1',
      description: 'Dwarf Mines (Kazordoon)',
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

bossInfo.set('Feroxa', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33298,31722,7:1',
      description: 'Grimvale (Edron)',
    },
  ],
  loot: ['Werewolf Helmet', 'Wolf Backpack'],
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
  raidMessages: [
    {
      time: '00:00:00',
      message:
        "The seals on Ferumbras' old citadel are glowing. Prepare for HIS return, mortals.",
      style: 'REGULAR',
    },
    {
      time: '00:10:00',
      message:
        "Ferumbras' return is at hand. The Edron Academy calls for heroes to fight that evil.",
      style: 'REGULAR',
    },
    {
      time: '00:20:00',
      message:
        'Ferumbras has returned to his citadel once more. Stop him before it is too late.',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Flamecaller Zazrak', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33180,31220,7:1',
      description: 'Muggy Plains (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33251,31152,6:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
})

bossInfo.set('Fleabringer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33092,31384,8:1',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33112,31457,8:1',
      description: 'Zao Steppe (Farmine)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#33251,31423,7:1',
      description: 'Zao Steppe (Farmine)',
    },
  ],
})

bossInfo.set('Foreman Kneebiter', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32553,31897,14:1',
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

  raidMessages: [
    {
      time: '00:00:00',
      message:
        "Gaz'haragoth will shatter your dreams in a barrage of nightmares!",
      style: 'HIGHLIGHT',
    },
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
  raidMessages: [
    {
      time: '00:00:00',
      message: 'An ancient evil is awakening in the mines beneath Hrodmir.',
      style: 'REGULAR',
    },
    {
      time: '00:10:00',
      message:
        'Demonic entities are entering the mortal realm in the Hrodmir mines.',
      style: 'REGULAR',
    },
    {
      time: '00:20:00',
      message:
        'The demonic master has revealed itself in the mines of Hrodmir.',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Grand Mother Foulscale', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33309,31173,7:1',
      description: 'Muggy Plains (Farmine)',
    },
  ],
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'The dragons of the Dragonblaze Mountains have descended to Zao to protect the lizardkin!',
      style: 'REGULAR',
    },
    {
      time: '00:15:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:20:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:25:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
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
      src: 'https://tibiamaps.io/map/embed#32483,32058,8:1',
      description: 'Grorlam',
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
      src: 'https://tibiamaps.io/map/embed#32957,32842,8:1',
      description: 'Chor (Port Hope)',
    },
  ],
})

bossInfo.set('Hirintror', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32145,31257,10:1',
      description: 'Formorgar Mines (Svargrond)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32366,31053,8:1',
      description: 'Nibelor (Svargrond)',
    },
  ],
})

bossInfo.set('Jesse the Wicked', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32372,32221,11:1',
      description: 'Ancient Temple (Thais)',
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
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'The ancient volcano on Goroma slowly becomes active once again.',
      style: 'REGULAR',
    },
    {
      time: '00:06:00',
      message: 'There is an evil presence at the volcano of Goroma.',
      style: 'REGULAR',
    },
    {
      time: '00:12:00',
      message:
        'Evil Cultists have called an ancient evil into the volcano on Goroma. Beware of its power mortals.',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Mornenion', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33087,32157,7:1',
      description: 'Shadowthorn (Venore)',
    },
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
      src: 'https://tibiamaps.io/map/embed#32762,32243,15:1',
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
  raidMessages: [
    {
      time: '00:04:00',
      message:
        'Orshabaal is about to make his way into the mortal realm. Run for your lives!',
      style: 'REGULAR',
    },
    {
      time: '00:05:00',
      message:
        "Orshabaal's minions are working on his return to the World. LEAVE Edron at once, mortals.",
      style: 'REGULAR',
    },
    {
      time: '00:06:40',
      message:
        'Orshabaal has been summoned from hell to plague the lands of mortals again.',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Robby the Reckless', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32198,31809,9:1',
      description: 'Ghostlands (Carlin)',
    },
  ],
})

bossInfo.set('Rotrender', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33925,32337,8:1',
      description: 'Azzilon Castle (Edron)',
    },
  ],
  loot: [
    "Rotrender's Sceptre",
    'Mighty Demonic Core Essence',
    'Rotrender Scalp',
    'Rotrender Claw',
    'Demon in a Golden Box',
  ],
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
      src: 'https://tibiamaps.io/map/embed#32180,32149,11:1',
      description: 'Katana Quest (Rookgaard)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#31975,32066,13:1',
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
      src: 'https://tibiamaps.io/map/embed#33238,31840,9:1',
      description: 'Rotworm Cave (Edron)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32779,31604,12:1',
      description: "Hellgate (Ab'Dendriel)",
    },
  ],
})

bossInfo.set('Rukor Zad', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32601,32383,10:1',
      description: 'Dark Cathedral (Plains of Havoc)',
    },
  ],
})

bossInfo.set('Shadowstalker', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33480,31233,8:1',
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

bossInfo.set('Sir Leopold', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32538,32512,10:1',
      description: 'Book World (Edron)',
    },
  ],
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'Once more, the sinister Sir Leopold leads his henchmen out of the book pages to wreak havoc.',
      style: 'REGULAR',
    },
    {
      time: '00:10:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:20:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:30:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
    },
  ],
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
      src: 'https://tibiamaps.io/map/embed#32541,32648,10:1',
      description: 'Bandit Caves (Port Hope)',
    },
  ],
})

bossInfo.set('Teleskor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#31981,32246,10:1',
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
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'Something abnominale is rising! Search for its spawns! Gather an army and destroy this threat!',
      style: 'REGULAR',
    },
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
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'Like a swarm of locusts the dreaded lancer beetles are pouring over the fertile parts of Zao.',
      style: 'REGULAR',
    },
    {
      time: '00:30:00',
      message: '(unannounced raid)',
      style: 'HIGHLIGHT',
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
      src: 'https://tibiamaps.io/map/embed#32785,32285,15:1',
      description: 'Pits of Inferno',
    },
  ],
  loot: ["The Handmaiden's Protector"],
})

bossInfo.set('The Hungerer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32155,32862,9:1',
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
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'The Pale Count has risen from his crypt deep under Drefia. Blood will flow.',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('The Plasmother', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32853,32331,15:1',
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
      src: 'https://tibiamaps.io/map/embed#33048,32377,14:1',
      description: 'Drefia (Darashia)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32440,32838,9:1',
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
      src: 'https://tibiamaps.io/map/embed#33268,31872,11:1',
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

bossInfo.set('Willi Wasp', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32345,31704,7:1',
      description: 'Carlin',
    },
  ],
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'Some wasps have been found north of Carlin. There is some loud buzzing in the air.',
      style: 'REGULAR',
    },
    {
      time: '00:04:10',
      message:
        "Buzzing madness north of Carlin! Be careful if you're allergic!",
      style: 'REGULAR',
    },
    {
      time: '00:05:00',
      message: 'Willi Wasp the Wicked has arrived!',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Xenia', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32891,31887,8:1',
      description: 'Amazon Camp (Venore)',
    },
    {
      src: 'https://tibiamaps.io/map/embed#32891,31887,9:1',
      description: 'Amazon Camp (Venore)',
    },
  ],
})

bossInfo.set('Yaga the Crone', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32712,32011,11:1',
      description: 'Green Claw Swamp (Venore)',
    },
  ],
})

bossInfo.set('Yakchal', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32205,31003,14:1',
      description: 'Formorgar Mines (Svargrond)',
    },
  ],
})

bossInfo.set('Yeti', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32006,31596,7:1',
      description: 'Folda (Carlin)',
    },
  ],
  loot: ['Bunnyslippers'],
})

bossInfo.set('Zarabustor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32508,31582,14:1',
      description: "Demona (Ab'Dendriel)",
    },
  ],
})

bossInfo.set('Zevelon Duskbringer', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#32769,31581,11:1',
      description: "Hellgate (Ab'Dendriel)",
    },
  ],
  loot: ['Vampire Lord Token'],
})

bossInfo.set('Zomba', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33159,32427,7:1',
      description: 'Darashia',
    },
  ],
  raidMessages: [
    {
      time: '00:00:00',
      message:
        'Hungry lions scout the western Darashian desert. Travellers beware!',
      style: 'REGULAR',
    },
    {
      time: '00:04:10',
      message:
        "Packs of hungry lions stalk Darashia's western desert. Be on your guard!",
      style: 'REGULAR',
    },
    {
      time: '00:05:00',
      message:
        'Hear the roar of Zomba, king of the lions, roaming the Darashia desert!',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Zulazza the Corruptor', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#33347,31609,1:1',
      description: 'Zzaion (Farmine)',
    },
  ],
  loot: ['Dragon Scale Boots', 'Earthborn Titan Armor'],
  raidMessages: [
    {
      time: '00:00:00',
      message: 'A massive orc force is gathering at the gates of Zzaion.',
      style: 'REGULAR',
    },
    {
      time: '00:03:00',
      message:
        'Orc reinforcements have arrived at the gates of Zzaion! The gates are under heavy attack!',
      style: 'REGULAR',
    },
    {
      time: '00:05:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:07:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:10:00',
      message:
        'More orc reinforcements have arrived at the gates of Zzaion! The gates are under heavy attack!',
      style: 'REGULAR',
    },
    {
      time: '00:11:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:13:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:15:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:17:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:19:00',
      message: '(unannounced raid)',
      style: 'UNANNOUNCED',
    },
    {
      time: '00:20:00',
      message:
        'The gates to Zzaion have been breached! Orcs are invading the city!',
      style: 'REGULAR',
    },
    {
      time: '00:30:00',
      message:
        'More orcs have arrived in Zzaion! The city is under attack! Strong lizard leaders have come to defend the city.',
      style: 'HIGHLIGHT',
    },
  ],
})

bossInfo.set('Zushuka', {
  locations: [
    {
      src: 'https://tibiamaps.io/map/embed#31942,31387,9:1',
      description: 'Ice Witch Temple (Svargrond)',
    },
  ],
  loot: ['Icy Culottes', 'Trapped Lightning'],
})

const spawnLocations: { name: string; locations: string[] }[] = [
  {
    name: bossTokens['albino dragons'],
    locations: ['Ankrahmun', 'Farmine', 'Fenrock', 'Goroma', 'PoI'],
  },
  { name: bossTokens['Battlemaster Zunzu'], locations: ['West', 'East'] },
  {
    name: bossTokens.Dreadmaw,
    locations: ['West', 'East'],
  },
  {
    name: bossTokens['Flamecaller Zazrak'],
    locations: ['Surface', '+1 North'],
  },
  {
    name: bossTokens.Fleabringer,
    locations: ['-1 North', '-1 South', 'Surface'],
  },
  {
    name: bossTokens.Hirintror,
    locations: ['Formorgar Mines', 'Nibelor'],
  },
  {
    name: bossTokens['Rottie the Rotworm'],
    locations: ['Katana Quest', 'Poison Spider Cave'],
  },
  {
    name: bossTokens['Rotworm Queen'],
    locations: ['Edron', 'Darashia', 'Liberty Bay', "Ab'Dendriel"],
  },
  {
    name: bossTokens['The Voice Of Ruin'],
    locations: ['Ghastly Dragons', 'Lizard Chosens'],
  },
  {
    name: bossTokens.Tyrn,
    locations: ['Drefia', 'Liberty Bay'],
  },
  {
    name: bossTokens['White Pale'],
    locations: ['Edron', 'Darashia', 'Liberty Bay'],
  },
]

type NameLocationArgs = { name: string; location?: string }

export const multipleSpawnLocationBosses = {
  names: new Set(spawnLocations.map(({ name }) => name)),
  entries: spawnLocations,
  displayName: ({ name, location }: NameLocationArgs) =>
    location ? `${name} (${location})` : name,
  isNameAndLocationValid: ({ name, location }: NameLocationArgs): boolean =>
    location
      ? !!spawnLocations
          .find((boss) => boss.name === name)
          ?.locations.find((bossLocation) => location === bossLocation)
      : bossSet.has(name),
}
