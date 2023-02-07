import { useState, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import {
  LabeledCard,
  Tabs,
  Text,
  NumericInput,
  CopyButton,
} from 'components/Atoms'
import { Select, ClientComponent, InfoTooltip } from 'components/Organisms'
import { blurOnEnter, isServer } from 'utils'
import { Spacer, Group, Chip } from '../../components'
import useStateRecord from './useStateRecord'
import CostComparison from './CostComparison'
import * as Icons from './icons'
import { calculateShoppingList } from './utils'
import { tierOptions, RECIPES, RecordKeys, tierName } from './schema'
import styles from './styles.module.css'

const ImbuementsCost = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  const [recipeIndex, setRecipeIndex] = useState(0)
  const [stateRecord, updateRecord] = useStateRecord()

  const { lowestCost, tokenCost, marketCost, tokenBuyList } = useMemo(
    () =>
      calculateShoppingList({
        recipeIndex,
        stateRecord,
        tier: stateRecord[RecordKeys.tier],
      }),
    [recipeIndex, stateRecord],
  )

  const currentTier = stateRecord[RecordKeys.tier]

  const tokenImbuementTier = tokenBuyList.filter(
    (buyWithTokens) => buyWithTokens,
  ).length

  const npcDialogue =
    tokenImbuementTier > 0
      ? `${RECIPES[recipeIndex].npcName} ${tierName[tokenImbuementTier]} yes`
      : ''

  const noDialogue = !npcDialogue && !isServer()

  return (
    <LabeledCard labelText={calculators.ImbuementsCost.labels.configurations}>
      <div className="child:flex-grow flex items-end gap-4">
        <ClientComponent className="w-full">
          <NumericInput
            label={
              <div className="flex items-center gap-1">
                <Icons.Label.GoldToken />
                {calculators.ImbuementsCost.labels.goldToken}
              </div>
            }
            aria-label={calculators.ImbuementsCost.labels.goldToken}
            placeholder={calculators.ImbuementsCost.pricePlaceholder}
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
          onChange={(e) => updateRecord({ [RecordKeys.tier]: +e.target.value })}
          noAlert
          className="w-full"
        />
      </div>

      <Tabs.Group
        activeIndex={recipeIndex}
        onChange={useCallback((index: number) => setRecipeIndex(index), [])}
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
                  <div
                    key={`${name}-${material.name}`}
                    className="child:shrink-0 mr-1 flex items-end gap-2 sm:mr-0"
                  >
                    <Icons.Material {...material} />
                    <NumericInput
                      key={material.name}
                      label={
                        <div className="flex items-center gap-1.5">
                          <span>{material.name}</span>
                          <CopyButton
                            variant="small"
                            copyString={material.name}
                          />
                        </div>
                      }
                      aria-label={material.name}
                      placeholder={calculators.ImbuementsCost.pricePlaceholder}
                      disabled={!usedInCurrentTier}
                      value={stateRecord[material.name]}
                      onChange={(value) =>
                        updateRecord({ [material.name]: value })
                      }
                      onKeyPress={isLastField ? blurOnEnter : undefined}
                      enterKeyHint={isLastField ? 'done' : 'next'}
                      className={clsx('ml-2 flex-grow', styles.numericInput)}
                    />
                    <Icons.BuyIcon
                      highlight={usedInCurrentTier && !shouldBuyWithToken}
                      type="market"
                    />
                    <Icons.BuyIcon
                      highlight={usedInCurrentTier && shouldBuyWithToken}
                      type="goldToken"
                    />
                  </div>
                )
              })}
            </ClientComponent>
          </Tabs.Panel>
        ))}
      </Tabs.Group>

      <ClientComponent
        className={clsx(
          'text-primaryHighlight flex items-center justify-end gap-1.5 text-xs font-bold italic transition-all',
          noDialogue && 'pointer-events-none opacity-0',
        )}
      >
        {npcDialogue}
        <CopyButton
          variant="small"
          copyString={npcDialogue}
          className={clsx(noDialogue && 'pointer-events-none opacity-0')}
          disabled={noDialogue}
        />
      </ClientComponent>

      <Spacer />

      <Group>
        <InfoTooltip.LabelWrapper>
          <strong>{calculators.ImbuementsCost.totalCost}</strong>
          <InfoTooltip
            labelSize
            content={
              <span className="grid gap-2 whitespace-nowrap">
                <div className="grid grid-cols-2 gap-8">
                  <CostComparison
                    title={
                      <>
                        <Icons.Label.GoldToken />
                        {calculators.ImbuementsCost.goldTokenOnly}:
                      </>
                    }
                    cost={tokenCost}
                    compareTo={lowestCost}
                  />

                  <CostComparison
                    title={
                      <>
                        <Icons.Label.Market />
                        {calculators.ImbuementsCost.marketOnly}:
                      </>
                    }
                    cost={marketCost}
                    compareTo={lowestCost}
                  />
                </div>

                <small className="mt-4">
                  {calculators.ImbuementsCost.tooltipInfo}
                </small>
              </span>
            }
          />
        </InfoTooltip.LabelWrapper>
        <Chip>
          <Text.GoldCoin value={lowestCost} />
        </Chip>
      </Group>
    </LabeledCard>
  )
}

export default ImbuementsCost
