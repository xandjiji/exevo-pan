import { RecordKeys, RECIPES, tierBasePrice } from './schema'
import { CalculatorArgs, ShoppingList, EfficientCostArgs } from './types'

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
  efficientPrice: ({
    tier,
    recipeIndex,
    stateRecord,
    tokenBuyList,
  }: EfficientCostArgs): number => {
    const { materials } = RECIPES[recipeIndex]
    const goldTokenPrice = stateRecord[RecordKeys.goldToken]

    let efficientCost = 0
    tokenBuyList.forEach((tierWillBeBoughtWithTokens, materialIndex) => {
      if (materialIndex + 1 > tier) return

      const material = materials[materialIndex]
      efficientCost += tierWillBeBoughtWithTokens
        ? goldTokenPrice * 2
        : (stateRecord[material.name] ?? 0) * material.amount
    })

    return efficientCost
  },
}

export const calculateShoppingList = ({
  tier: maxTier,
  ...rest
}: CalculatorArgs): ShoppingList => {
  const tokenBuyList = [true, true, true]

  for (let tierIteration = maxTier; tierIteration > 0; tierIteration -= 1) {
    const calcArgs: CalculatorArgs = { tier: tierIteration, ...rest }
    const tokenPrice = calculate.tokenPrice(calcArgs)
    const marketPrice = calculate.marketPrice(calcArgs)

    if (tokenPrice <= marketPrice) {
      break
    } else {
      tokenBuyList[tierIteration - 1] = false
    }
  }

  const fullCalcArgs = { tier: maxTier, ...rest }
  const basePrice = tierBasePrice[maxTier]

  return {
    efficientCost:
      calculate.efficientPrice({ ...fullCalcArgs, tokenBuyList }) + basePrice,
    tokenCost: calculate.tokenPrice(fullCalcArgs) + basePrice,
    marketCost: calculate.marketPrice(fullCalcArgs) + basePrice,
    tokenBuyList,
  }
}
