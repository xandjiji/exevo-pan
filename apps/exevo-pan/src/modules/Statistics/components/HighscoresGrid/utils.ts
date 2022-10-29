import { formatNumberWithCommas } from 'utils'

export const pickFromCharacter = {
  currentBid: ({ currentBid }: CharacterObject) => currentBid,
  level: ({ level }: CharacterObject) => level,
  skills: {
    magic: ({ skills }: CharacterObject) => skills.magic,
    distance: ({ skills }: CharacterObject) => skills.distance,
    sword: ({ skills }: CharacterObject) => skills.sword,
    axe: ({ skills }: CharacterObject) => skills.axe,
    club: ({ skills }: CharacterObject) => skills.club,
    fist: ({ skills }: CharacterObject) => skills.fist,
    shielding: ({ skills }: CharacterObject) => skills.shielding,
    fishing: ({ skills }: CharacterObject) => skills.fishing,
  },
}

export const format = {
  tc: (value: number) => `${formatNumberWithCommas(value)} TC`,
  numberWithCommas: formatNumberWithCommas,
}
