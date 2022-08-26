import { Receipt, Transaction, HuntData, ExtraExpenses } from './types'

const breakLines = (text: string): string[] => text.split('\n')
const sanitizeName = (name: string) => name.replace(' (Leader)', '')
const sanitizeValueLine = (line: string): number => {
  const [, value] = line.split(':')
  return +value.trim().replace(/,/g, '')
}

const parseReceipt = ([name, ...valueLines]: string[]): Receipt => {
  const [loot, supplies, balance] = valueLines.map(sanitizeValueLine)

  return { name: sanitizeName(name), loot, supplies, balance }
}

export const parse = {
  SessionTimestamp: (text: string) => {
    const [rawTimestamps] = breakLines(text).slice(0, 2)

    const [dirtyFrom] = rawTimestamps.split(' to ')
    const [, from] = dirtyFrom.split('From ')

    return +new Date(from)
  },
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

const normalizeDustAmount = (value: number): number =>
  Math.max(0, Math.floor(value))

const findTransactionsRequired = (
  receipts: Receipt[],
): Transaction<string>[] => {
  const sortedReceipts = [...receipts].sort((a, b) => b.balance - a.balance)

  const teamBalance = sortedReceipts.reduce(
    (acc, { balance }) => acc + balance,
    0,
  )

  const teamSize = sortedReceipts.length
  const fairBalance = teamBalance / teamSize

  const ledger: ExtraExpenses = {}
  sortedReceipts.forEach(({ name }) => {
    ledger[name] = 0
  })

  const playerShould = {
    transfer: ({ name, balance }: Receipt): number =>
      normalizeDustAmount(balance + ledger[name] - fairBalance),
    receive: ({ name, balance }: Receipt): number =>
      normalizeDustAmount(fairBalance - (balance + ledger[name])),
  }

  const transactions: Transaction<string>[] = []
  const transfer = ({ from, to, amount }: Transaction<string>) => {
    ledger[from] -= amount
    ledger[to] += amount

    transactions.push({ from, to, amount })
  }

  sortedReceipts.forEach((from) => {
    sortedReceipts.forEach((to) => {
      if (from.name === to.name) return

      const maxTransferAmount = playerShould.transfer(from)
      const maxReceiveAmount = playerShould.receive(to)

      const amount = Math.round(Math.min(maxTransferAmount, maxReceiveAmount))
      if (amount) {
        transfer({
          from: from.name,
          to: to.name,
          amount,
        })
      }
    })
  })

  return transactions
}

export const calculateHuntData = (
  session: string,
  extraExpenses: ExtraExpenses,
  removedPlayers: Set<string>,
): HuntData => {
  try {
    const playerReceipts = parse
      .PlayerReceipts(session)
      .map(({ supplies, balance, ...rest }) => {
        const extraCost = extraExpenses[rest.name] ?? 0

        return {
          ...rest,
          supplies: supplies + extraCost,
          balance: balance - extraCost,
        }
      })

    return {
      teamReceipt: playerReceipts.reduce((acc, player) => ({
        name: 'Team',
        loot: acc.loot + player.loot,
        supplies: acc.supplies + player.supplies,
        balance: acc.balance + player.balance,
      })),
      playerReceipts,
      transactions: findTransactionsRequired(
        playerReceipts.filter(({ name }) => !removedPlayers.has(name)),
      ),
      timestamp: parse.SessionTimestamp(session),
    }
  } catch {
    return {}
  }
}
