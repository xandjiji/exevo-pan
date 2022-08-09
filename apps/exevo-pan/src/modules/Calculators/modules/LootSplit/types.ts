export type Receipt = {
  name: string
  loot: number
  supplies: number
  balance: number
}

export type Transaction<ReferenceType> = {
  from: ReferenceType
  to: ReferenceType
  amount: number
}

export type ExtraExpenses = Record<string, number>

export type HistoryEntry = {
  key: string
  timestamp: number
  rawData: string
  extraExpenses: ExtraExpenses
}

export type HuntData = {
  timestamp?: number
  teamReceipt?: Receipt
  playerReceipts?: Receipt[]
  transactions?: Transaction<string>[]
}
