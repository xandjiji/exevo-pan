export type Material = {
  name: string
  amount: number
  icon: () => JSX.Element
}

export type RecipeSchema = {
  name: string
  materials: Material[]
}

export type StateRecord = Record<string, number>

export type CalculatorArgs = {
  tier: number
  recipeIndex: number
  stateRecord: StateRecord
}

type TokenBuyList = boolean[]

export type EfficientCostArgs = {
  tokenBuyList: TokenBuyList
} & CalculatorArgs

export type ShoppingList = {
  efficientCost: number
  tokenCost: number
  marketCost: number
  tokenBuyList: TokenBuyList
}

export type BuyIconProps = {
  highlight: boolean
}
