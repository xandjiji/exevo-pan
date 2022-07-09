import { RecordKeys, RECIPES } from './schema'
import { CalculatorArgs, ShoppingList } from './types'

const calculate = {
  tokenPrice: ({ tier, stateRecord }: CalculatorArgs): number => {
    const goldTokenPrice = stateRecord[RecordKeys.goldToken]
    return goldTokenPrice * 2 * (tier + 1)
  },
  marketPrice: ({ tier, recipeIndex, stateRecord }: CalculatorArgs): number => {
    const { materials } = RECIPES[recipeIndex]

    let cost = 0
    materials.slice(0, tier).forEach(({ name, amount }) => {
      cost += (stateRecord[name] ?? 0) * amount
    })

    return cost
  },
}

export const calculateShoppingList = ({
  tier: maxTier,
  ...rest
}: CalculatorArgs): ShoppingList => {
  const shoppingList: ShoppingList = [false, false, false]

  for (let tierIteration = maxTier; tierIteration > 1; tierIteration -= 1) {
    const calcArgs: CalculatorArgs = { tier: tierIteration, ...rest }
    const tokenPrice = calculate.tokenPrice(calcArgs)
    const marketPrice = calculate.marketPrice(calcArgs)

    if (tokenPrice <= marketPrice) {
      break
    } else {
      shoppingList[tierIteration - 1] = true
    }
  }

  return shoppingList
}
