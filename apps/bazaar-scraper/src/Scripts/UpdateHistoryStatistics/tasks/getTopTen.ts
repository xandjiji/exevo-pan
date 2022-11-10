/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { tabBroadcast, coloredText } from 'logging'

const top10Extractor = (
  auctions: PartialCharacterObject[],
  accessCriteria: (character: PartialCharacterObject) => number,
): PartialCharacterObject[] => {
  auctions.sort((a, b) => accessCriteria(b) - accessCriteria(a))

  const characterNames = new Set<string>([])
  const top10: PartialCharacterObject[] = []
  let i = 0
  while (true) {
    if (top10.length === 10) break

    const currentCharacter = auctions[i]

    if (!currentCharacter) break

    const { nickname } = currentCharacter
    if (!characterNames.has(nickname)) {
      top10.push(currentCharacter)
      characterNames.add(nickname)
    }

    i += 1
  }

  return top10
}

const unproxiedBy = {
  bid: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ currentBid }) => currentBid),
  level: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ level }) => level),
  magic: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { magic } }) => magic),
  club: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { club } }) => club),
  fist: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { fist } }) => fist),
  sword: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { sword } }) => sword),
  fishing: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { fishing } }) => fishing),
  axe: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { axe } }) => axe),
  distance: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { distance } }) => distance),
  shielding: (auctions: PartialCharacterObject[]) =>
    top10Extractor(auctions, ({ skills: { shielding } }) => shielding),
}

export const by = new Proxy(unproxiedBy, {
  get: (obj: typeof unproxiedBy, key: keyof typeof obj) => {
    tabBroadcast(
      `Generating top 10 by ${coloredText(key, 'highlight')}`,
      'neutral',
    )

    return obj[key]
  },
})
