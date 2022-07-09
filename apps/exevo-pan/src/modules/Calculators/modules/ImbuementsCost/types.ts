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

export type ShoppingList = [boolean, boolean, boolean]
