import { coloredText } from 'logging'
import {
  PartialCharacterObject,
  OldCharacterObject,
  OldServerObject,
} from './types'

export const printFilename = (filename: string): string =>
  coloredText(filename, 'highlight')

export const removeDupedIds = <T extends { id: number }>(array: T[]): T[] => {
  const idSet: Set<number> = new Set([])

  return array.filter(({ id }) => {
    const wasInSet = idSet.has(id)
    idSet.add(id)
    return !wasInSet
  })
}

export const buildCharacterData = (
  characterData: PartialCharacterObject[],
  serverData: OldServerObject[],
): OldCharacterObject[] =>
  characterData.map((character) => ({
    ...character,
    serverData: serverData[character.serverId],
  }))
