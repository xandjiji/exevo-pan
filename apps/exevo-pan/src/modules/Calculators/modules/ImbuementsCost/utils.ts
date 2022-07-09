import { RecordKeys, RECIPES } from './schema'
import { PriceCalculator } from './types'

const tokenPrice: PriceCalculator = ({ stateRecord }) => {
  const tier = stateRecord[RecordKeys.tier]
  const goldTokenPrice = stateRecord[RecordKeys.goldToken]
  return goldTokenPrice * 2 * (tier + 1)
}

const marketPrice: PriceCalculator = ({ recipeIndex, stateRecord }) => {
  const tier = stateRecord[RecordKeys.tier]
  const { materials } = RECIPES[recipeIndex]

  let cost = 0
  materials.slice(0, tier).forEach(({ name, amount }) => {
    cost += (stateRecord[name] ?? 0) * amount
  })

  return cost
}

export const calculate = { tokenPrice, marketPrice }
