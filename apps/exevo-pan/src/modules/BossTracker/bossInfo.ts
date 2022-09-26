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
