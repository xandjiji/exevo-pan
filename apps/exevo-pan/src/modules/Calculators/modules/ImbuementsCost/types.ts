export type Material = {
  name: string
  amount: number
  icon: () => JSX.Element
}

export type RecipeSchema = {
  name: string
  materials: Material[]
}

export type StateRecord = Record<string, string>
