const VOCATION_IDS = {
  NONE: 0,
  KNIGHT: 1,
  PALADIN: 2,
  SORCERER: 3,
  DRUID: 4,
} as const

const VOCATION_NAMES = {
  0: 'None',
  1: 'Knight',
  2: 'Paladin',
  3: 'Sorcerer',
  4: 'Druid',
} as const

const PROMOTED_VOCATION_TITLE = {
  0: '',
  1: 'Elite',
  2: 'Royal',
  3: 'Master',
  4: 'Elder',
} as const

type VocationNameKey = keyof typeof VOCATION_NAMES
type VocationId = keyof typeof VOCATION_IDS

const getName = (vocationId: number): string => {
  const key = vocationId as VocationNameKey
  return VOCATION_NAMES[key]
}

const getFullName = (vocationId: number, level: number): string => {
  const key = vocationId as VocationNameKey
  const baseName = VOCATION_NAMES[key]

  if (level < 20 || vocationId === 0) {
    return baseName
  }

  return `${PROMOTED_VOCATION_TITLE[key]} ${baseName}`
}

const getId = (name: string): number => {
  const key = name as VocationId
  return VOCATION_IDS[key]
}

const getIdByRegex = (name: string): number => {
  if (/knight/gi.test(name)) return VOCATION_IDS.KNIGHT
  if (/paladin/gi.test(name)) return VOCATION_IDS.PALADIN
  if (/sorcerer/gi.test(name)) return VOCATION_IDS.SORCERER
  if (/druid/gi.test(name)) return VOCATION_IDS.DRUID

  return VOCATION_IDS.NONE
}

export const vocation = {
  getName,
  getFullName,
  getId,
  getIdByRegex,
}
