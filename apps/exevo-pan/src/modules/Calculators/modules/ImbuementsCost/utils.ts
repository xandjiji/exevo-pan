import { RecordKeys, RECIPES, tierBasePrice } from './schema'
import {
  TokenBuyList,
  PossibilityRecord,
  CalculatorArgs,
  ShoppingList,
} from './types'

const tierPossibilities: Record<number, TokenBuyList[]> = {
  1: [[true], [false]],
  2: [
    [true, true],
    [true, false],
    [false, false],
  ],
  3: [
    [true, true, true],
    [true, true, false],
    [true, false, false],
    [false, false, false],
  ],
}

const calculate = {
  materialsCost: ({
    tier,
    recipeIndex,
    stateRecord,
  }: CalculatorArgs): number => {
    const { materials } = RECIPES[recipeIndex]
    const { name, amount } = materials[tier - 1]

    return (stateRecord[name] ?? 0) * amount
  },
  tokensCost: ({ tier, stateRecord }: CalculatorArgs): number => {
    const goldTokenPrice = stateRecord[RecordKeys.goldToken]
    return goldTokenPrice * 2 * tier
  },
}

export const calculateShoppingList = ({
  tier: maxTier,
  ...rest
}: CalculatorArgs): ShoppingList => {
  const possibilityRecords: PossibilityRecord[] = []
  const basePrice = tierBasePrice[maxTier]

  tierPossibilities[maxTier].forEach((tokenBuyList) => {
    let cost = basePrice
    tokenBuyList.forEach((buyWithTokens, materialTier) => {
      cost += buyWithTokens
        ? calculate.tokensCost({ ...rest, tier: 1 })
        : calculate.materialsCost({ ...rest, tier: materialTier + 1 })
    })

    possibilityRecords.push({ cost, tokenBuyList })
  })

  const [lowestCost] = possibilityRecords.sort((a, b) => a.cost - b.cost)
  const fullTokenCost = possibilityRecords.find(({ tokenBuyList }) =>
    tokenBuyList.every((buyWithToken) => buyWithToken),
  ) as PossibilityRecord
  const fullMarketCost = possibilityRecords.find(({ tokenBuyList }) =>
    tokenBuyList.every((buyWithToken) => !buyWithToken),
  ) as PossibilityRecord

  return {
    lowestCost: lowestCost.cost,
    tokenCost: fullTokenCost.cost,
    marketCost: fullMarketCost.cost,
    tokenBuyList: lowestCost.tokenBuyList,
  }
}
