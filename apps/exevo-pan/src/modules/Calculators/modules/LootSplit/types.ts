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

export type Session = {
  from: number
  to: number
  duration: string
}
