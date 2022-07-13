import { Receipt, Transaction } from './types'

const breakLines = (text: string): string[] => text.split('\n')
const sanitizeName = (name: string) => name.replace(' (Leader)', '')
const sanitizeValueLine = (line: string): number => {
  const [, value] = line.split(':')
  return +value.trim().replace(/,/g, '')
}

export const parseReceipt = ([name, ...valueLines]: string[]): Receipt => {
  const [loot, supplies, balance] = valueLines.map(sanitizeValueLine)

  return { name: sanitizeName(name), loot, supplies, balance }
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

export const findTransactionsRequired = (
  receipts: Receipt[],
): Transaction<string>[] => {
  let teamBalance = 0
  receipts.forEach(({ balance }) => {
    teamBalance += balance
  })

  const teamSize = receipts.length
  const fairBalance = teamBalance / teamSize

  const playerShould = {
    transfer: ({ balance }: Receipt): number =>
      Math.max(0, balance - fairBalance),
    receive: ({ balance }: Receipt): number =>
      Math.max(0, fairBalance - balance),
  }

  const sortedReceipts = receipts.sort((a, b) => b.balance - a.balance)

  const transactions: Transaction<string>[] = []
  const transfer = ({ from, to, amount: floatAmount }: Transaction<number>) => {
    const amount = Math.round(floatAmount)

    if (amount) {
      sortedReceipts[from].balance -= amount
      sortedReceipts[to].balance += amount

      transactions.push({
        from: sortedReceipts[from].name,
        to: sortedReceipts[to].name,
        amount,
      })
    }
  }

  for (let sendIndex = 0; sendIndex < teamSize; sendIndex += 1) {
    for (
      let receiveIndex = sendIndex + 1;
      receiveIndex < teamSize;
      receiveIndex += 1
    ) {
      const maxTransferAmount = playerShould.transfer(sortedReceipts[sendIndex])
      const maxReceiveAmount = playerShould.receive(
        sortedReceipts[receiveIndex],
      )

      if (maxTransferAmount && maxReceiveAmount) {
        transfer({
          from: sendIndex,
          to: receiveIndex,
          amount: Math.min(maxTransferAmount, maxReceiveAmount),
        })
      }
    }
  }
  console.log(transactions)
  return transactions
}
