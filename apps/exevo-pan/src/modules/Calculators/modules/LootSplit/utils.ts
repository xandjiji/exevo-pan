import { Receipt } from './types'

const breakLines = (text: string): string[] => text.split('\n')

const sanitizeValueLine = (line: string): number => {
  const [, value] = line.split(':')
  return +value.trim().replace(/,/g, '')
}

export const parseReceipt = ([name, ...valueLines]: string[]): Receipt => {
  const [loot, supplies, balance] = valueLines.map(sanitizeValueLine)

  return { name, loot, supplies, balance }
}

export const parse = {
  TeamReceipt: (text: string): Receipt =>
    parseReceipt(breakLines(text).slice(2, 6)),
  PlayerReceipts: (text: string): Receipt[] => {
    const lines = breakLines(text)
    const playerLines = lines.slice(6)

    const receipts: Receipt[] = []
    while (playerLines.length > 0) {
      receipts.push(parseReceipt(playerLines.splice(0, 6)))
    }

    return receipts
  },
}
