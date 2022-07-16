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
