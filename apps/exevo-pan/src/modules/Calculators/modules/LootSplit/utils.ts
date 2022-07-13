import { PlayerReceipt } from './types'

const sanitizeValueLine = (line: string): number => {
  const [, value] = line.split(':')
  return +value.trim().replace(/,/g, '')
}

export const getPlayerReceipts = (text: string): PlayerReceipt[] => {
  const lines = text.split('\n')
  const playerLines = lines.slice(6)

  const receipts: PlayerReceipt[] = []
  while (playerLines.length > 0) {
    const [name, ...valueLines] = playerLines.splice(0, 6)
    const [loot, supplies, balance] = valueLines.map(sanitizeValueLine)

    receipts.push({ name, loot, supplies, balance })
  }

  return receipts
}
