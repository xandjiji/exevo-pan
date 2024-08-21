export type Material = {
  src: string
  name: string
  amount: number
}

export type RecipeSchema = {
  name: string
  npcName: string
  materials: Material[]
}

export type StateRecord = Record<string, number>

export type CalculatorArgs = {
  tier: number
  recipeIndex: number
  stateRecord: StateRecord
}

export type TokenBuyList = boolean[]

export type PossibilityRecord = {
  cost: number
  tokenBuyList: TokenBuyList
}

export type ShoppingList = {
  lowestCost: number
  tokenCost: number
  marketCost: number
  tokenBuyList: TokenBuyList
}

export type BuyIconProps = {
  highlight: boolean
  type: 'market' | 'goldToken'
}
