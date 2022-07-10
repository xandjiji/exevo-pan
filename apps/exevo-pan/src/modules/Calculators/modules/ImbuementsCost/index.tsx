import { useState, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { Tabs } from 'components/Atoms'
import { Select, ClientComponent, Tooltip } from 'components/Organisms'
import { Main, LabeledCard } from '../../components'
import { LabelWrapper } from './atoms'
import useStateRecord from './useStateRecord'
import NumericInput from './NumericInput'
import * as Icons from './icons'
import { calculateTokenBuyList } from './utils'
import { tierOptions, RECIPES, RecordKeys } from './schema'
import styles from './styles.module.css'

/* @ ToDo:
- results
    tooltip buy with
    total price (incluir shrine chance tax + base tier price) (with diff)
- i18n (incluir GP Value)
*/

const ImbuementsCost = () => {
  const [recipeIndex, setRecipeIndex] = useState(0)
  const [stateRecord, updateRecord] = useStateRecord()

  const tokenBuyList = useMemo(
    () =>
      calculateTokenBuyList({
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
                <LabelWrapper>
                  <Icons.LabelGoldToken />
                  Gold Token price
                </LabelWrapper>
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

                  return (
                    <div className="child:shrink-0 mr-1 flex items-end gap-2 sm:mr-0">
                      <Tooltip
                        content={`${material.amount}x ${material.name}`}
                        placement="left"
                        offset={[0, 8]}
                      >
                        <material.icon />
                      </Tooltip>
                      <NumericInput
                        key={material.name}
                        label={`${material.name} price`}
                        disabled={!usedInCurrentTier}
                        value={stateRecord[material.name]}
                        onChange={(value) =>
                          updateRecord({ [material.name]: value })
                        }
                        className={clsx('flex-grow', styles.numericInput)}
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
      </LabeledCard>
    </Main>
  )
}

export default ImbuementsCost
