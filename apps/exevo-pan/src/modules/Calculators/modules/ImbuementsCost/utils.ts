import { RecordKeys, RECIPES } from './schema'
import { CalculatorArgs, TokenBuyList } from './types'

const calculate = {
  tokenPrice: ({ tier, stateRecord }: CalculatorArgs): number => {
    const goldTokenPrice = stateRecord[RecordKeys.goldToken]
    return goldTokenPrice * 2 * tier
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

export const calculateTokenBuyList = ({
  tier: maxTier,
  ...rest
}: CalculatorArgs): TokenBuyList => {
  const shoppingList: TokenBuyList = [true, true, true]

  for (let tierIteration = maxTier; tierIteration > 0; tierIteration -= 1) {
    const calcArgs: CalculatorArgs = { tier: tierIteration, ...rest }
    const tokenPrice = calculate.tokenPrice(calcArgs)
    const marketPrice = calculate.marketPrice(calcArgs)

    if (tokenPrice <= marketPrice) {
      break
    } else {
      shoppingList[tierIteration - 1] = false
    }
  }

  return shoppingList
}
