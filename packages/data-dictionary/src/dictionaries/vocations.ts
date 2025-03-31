const VOCATION_IDS = {
  NONE: 0,
  KNIGHT: 1,
  PALADIN: 2,
  SORCERER: 3,
  DRUID: 4,
  MONK: 4,
} as const

const VOCATION_NAMES = {
  0: 'None',
  1: 'Knight',
  2: 'Paladin',
  3: 'Sorcerer',
  4: 'Druid',
  5: 'Monk',
} as const

const PROMOTED_VOCATION_TITLE = {
  0: '',
  1: 'Elite',
  2: 'Royal',
  3: 'Master',
  4: 'Elder',
  5: 'Exalted',
} as const

export type VocationId = ValueOf<typeof VOCATION_IDS>
export type VocationNames = ValueOf<typeof VOCATION_NAMES>

export const vocation = {
  getVocationName: (vocationId: number): VocationNames =>
    VOCATION_NAMES[vocationId as VocationId],
  getPromotedName: ({
    vocationId,
    level,
  }: {
    vocationId: number
    level: number
  }): string => {
    const baseName = VOCATION_NAMES[vocationId as VocationId]

    if (level < 20 || vocationId === 0) {
      return baseName
    }

    return `${PROMOTED_VOCATION_TITLE[vocationId as VocationId]} ${baseName}`
  },
  getIdByRegex: (name: string): VocationId => {
    if (/knight/gi.test(name)) return VOCATION_IDS.KNIGHT
    if (/paladin/gi.test(name)) return VOCATION_IDS.PALADIN
    if (/sorcerer/gi.test(name)) return VOCATION_IDS.SORCERER
    if (/druid/gi.test(name)) return VOCATION_IDS.DRUID
    if (/monk/gi.test(name)) return VOCATION_IDS.MONK

    return VOCATION_IDS.NONE
  },
  VOCATION_IDS,
  VOCATION_NAMES,
  PROMOTED_VOCATION_TITLE,
}
