export type Material = {
  name: string
  amount: number
  icon: () => JSX.Element
}

export type Recipe = {
  name: string
  materials: [Material, Material, Material]
}
