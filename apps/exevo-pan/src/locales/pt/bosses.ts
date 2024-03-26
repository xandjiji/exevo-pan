import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/bosses'

export default defaultComposer(defaultTranslations, {
  Header: {
    bossTracker: 'Boss Tracker',
    huntingGroups: 'Grupos de caça',
  },
  BossCard: {
    lastSeen: 'Última vez visto',
    thisSS: 'Server save atual',
    /* 'hours ago' */
    ago: 'atrás',
    thisCreatureHas: 'Essa criatura tem',
    differentSpawnLocations: 'locais diferentes de spawn.',
    itIs: 'É',
    possible: 'possível',
    toSpawn: 'nascer neste local.',
    thereAre: 'Faltam',
    /* days left */
    left: ' ',
    before: 'antes que ele possa nascer nesse local.',
    itsUpToYou: 'Cabe a você descobrir qual dos locais é este',
    chanceToSpawn: 'Chance de nascer hoje',
    unknown: 'Desconhecido',
    noChance: 'Sem chance',
    expectedIn: 'Aparecerá em',
  },
  BossDialog: {
    respawns: 'Renasce a cada {{min}}~{{max}} dias',
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
})
