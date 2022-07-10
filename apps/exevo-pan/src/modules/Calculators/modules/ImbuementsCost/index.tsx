import { useState, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { Tabs, Text } from 'components/Atoms'
import { Select, ClientComponent, InfoTooltip } from 'components/Organisms'
import { blurOnEnter } from 'utils'
import { Main, LabeledCard, Spacer, Group, Chip } from '../../components'
import useStateRecord from './useStateRecord'
import NumericInput from './NumericInput'
import CostComparison from './CostComparison'
import * as Icons from './icons'
import { calculateShoppingList } from './utils'
import { tierOptions, RECIPES, RecordKeys } from './schema'
import styles from './styles.module.css'

/* @ ToDo:
- i18n (incluir GP Value) (incluir Market e GoldToken titles)
*/

const ImbuementsCost = () => {
  const [recipeIndex, setRecipeIndex] = useState(0)
  const [stateRecord, updateRecord] = useStateRecord()

  const { efficientCost, tokenCost, marketCost, tokenBuyList } = useMemo(
    () =>
      calculateShoppingList({
        recipeIndex,
        stateRecord,
        tier: stateRecord[RecordKeys.tier],
      }),
    [recipeIndex, stateRecord],
  )

  const currentTier = stateRecord[RecordKeys.tier]

  return (
    <Main>
      <LabeledCard labelText="Price configurations">
        <div className="child:flex-grow flex items-end gap-4">
          <ClientComponent className="w-full">
            <NumericInput
              label={
                <div className="flex items-center gap-1">
                  <Icons.Label.GoldToken />
                  Gold Token price
                </div>
              }
              aria-label="Gold Token price"
              step={1000}
              value={stateRecord[RecordKeys.goldToken]}
              onChange={(value) =>
                updateRecord({ [RecordKeys.goldToken]: value })
              }
            />
          </ClientComponent>

          <Select
            label="Tier"
            options={tierOptions}
            value={currentTier.toString()}
            onChange={(e) =>
              updateRecord({ [RecordKeys.tier]: +e.target.value })
            }
            noAlert
            className="w-full"
          />
        </div>

        <Tabs.Group
          activeIndex={recipeIndex}
          onChange={useCallback((index) => setRecipeIndex(index), [])}
        >
          {RECIPES.map(({ name, materials }) => (
            <Tabs.Panel
              key={name}
              label={name}
              className="overflow-auto sm:overflow-visible"
            >
              <ClientComponent className="grid gap-4 py-2">
                {materials.map((material, materialIndex) => {
                  const shouldBuyWithToken = tokenBuyList[materialIndex]
                  const usedInCurrentTier = materialIndex < currentTier
                  const isLastField = materialIndex + 1 === currentTier

                  return (
                    <div className="child:shrink-0 mr-1 flex items-end gap-2 sm:mr-0">
                      <Icons.Material {...material} />
                      <NumericInput
                        key={material.name}
                        label={`${material.name} price`}
                        disabled={!usedInCurrentTier}
                        value={stateRecord[material.name]}
                        onChange={(value) =>
                          updateRecord({ [material.name]: value })
                        }
                        onKeyPress={isLastField ? blurOnEnter : undefined}
                        enterKeyHint={isLastField ? 'done' : 'next'}
                        className={clsx('ml-2 flex-grow', styles.numericInput)}
                      />
                      <Icons.Market
                        highlight={usedInCurrentTier && !shouldBuyWithToken}
                      />
                      <Icons.GoldToken
                        highlight={usedInCurrentTier && shouldBuyWithToken}
                      />
                    </div>
                  )
                })}
              </ClientComponent>
            </Tabs.Panel>
          ))}
        </Tabs.Group>

        <Spacer />

        <Group>
          <div className="flex items-center gap-1">
            <strong>Total cost</strong>
            <InfoTooltip
              className="h-3 w-3"
              content={
                <span className="grid gap-2 whitespace-nowrap">
                  <div className="grid grid-cols-2 gap-8">
                    <CostComparison
                      title={
                        <>
                          <Icons.Label.GoldToken />
                          Gold Tokens only:
                        </>
                      }
                      cost={tokenCost}
                      compareTo={efficientCost}
                    />

                    <CostComparison
                      title={
                        <>
                          <Icons.Label.Market />
                          Market only:
                        </>
                      }
                      cost={marketCost}
                      compareTo={efficientCost}
                    />
                  </div>

                  <small className="mt-4">
                    (Includes: base price + 100% success fee)
                  </small>
                </span>
              }
            />
          </div>
          <Chip>
            <Text.GoldCoin value={efficientCost} />
          </Chip>
        </Group>
      </LabeledCard>
    </Main>
  )
}

export default ImbuementsCost
