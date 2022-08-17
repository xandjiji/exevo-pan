/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { Input, Checkbox, Slider } from 'components/Atoms'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { routes } from 'Constants'
import { blurOnEnter } from 'utils'
import { Main, LabeledCard, Spacer, Chip } from '../../components'
import {
  LOW_BLOW_MULTIPLIER,
  ELEMENTAL_DAMAGE,
  ELEMENTAL_PROC_CHANCE,
  POWERFUL_MULTIPLIER,
  SPRITE_PATH,
  ARTICLE_SLUG,
} from './constants'
import { translations } from './locales'

const transformBonusResistance = (value: number) =>
  `${value > 0 ? '+' : ''}${value}%`

const Group = (args: JSX.IntrinsicElements['div']) => (
  <div {...args} className="text-tsm flex items-center justify-between gap-4" />
)

export const Calculator = () => {
  const [averageDamage, setAverageDamage] = useState(500)

  const lowBlowAverage = useMemo(
    () => Math.round(averageDamage * LOW_BLOW_MULTIPLIER),
    [averageDamage],
  )

  const [creatureHp, setCreatureHp] = useState(2000)
  const [bonusResistance, setBonusResistance] = useState(0)
  const [powerful, setPowerful] = useState(false)

  const elementalAverage = useMemo(
    () =>
      Math.round(
        creatureHp *
          (ELEMENTAL_PROC_CHANCE *
            (ELEMENTAL_DAMAGE * (1 + bonusResistance / 100))) +
          averageDamage * (powerful ? POWERFUL_MULTIPLIER : 1),
      ),
    [averageDamage, creatureHp, bonusResistance, powerful],
  )

  const { locale } = useRouter()
  const texts = translations[locale as RegisteredLocale]

  return (
    <>
      <Input
        label={texts.yourAverageDamage}
        type="number"
        step={100}
        min={0}
        value={averageDamage}
        onChange={(e) => setAverageDamage(+e.target.value)}
        noAlert
      />

      <LabeledCard
        noBackground
        labelText={`Low Blow + ${texts.criticalChance}`}
      >
        <Group>
          <strong id="average-dps">{texts.finalAverageDamage}:</strong>
          <Chip aria-labelledby="average-dps">
            <Image
              src={`${SPRITE_PATH}/Low Blow.png`}
              width={16}
              height={16}
              alt="Low Blow"
            />
            {lowBlowAverage}
          </Chip>
        </Group>
      </LabeledCard>

      <LabeledCard noBackground labelText={texts.elementalCharm}>
        <Checkbox
          label={texts.criticalChance}
          checked={powerful}
          onClick={() => setPowerful((prev) => !prev)}
        />

        <Input
          label={texts.creatureHP}
          type="number"
          step={100}
          min={0}
          value={creatureHp}
          onChange={(e) => setCreatureHp(+e.target.value)}
          noAlert
          onKeyPress={blurOnEnter}
          enterKeyHint="done"
        />

        <Slider
          label={`${texts.elementalBonus}:`}
          min={0}
          max={100}
          displayValue
          transformDisplayedValues={transformBonusResistance}
          value={bonusResistance}
          onChange={(e) => setBonusResistance(+e.target.value)}
          className="sm:min-w-[230px]"
        />

        <Spacer className="mt-2" />

        <Group>
          <strong>{texts.finalAverageDamage}:</strong>
          <Chip>
            <Image
              src={`${SPRITE_PATH}/Charm.png`}
              width={16}
              height={16}
              alt={texts.elementalCharm}
            />
            {elementalAverage}
          </Chip>
        </Group>
      </LabeledCard>
    </>
  )
}

const CharmDamage = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  return (
    <Main>
      <div className="child:bg-background grid gap-6">
        <Calculator />
        <p className="text-tsm mb-4 font-light md:text-center">
          {calculators.CharmDamage.moreInfo}{' '}
          <NextLink href={`${routes.BLOG}/${ARTICLE_SLUG}`}>
            <a className="text-primaryHighlight font-bold">
              {calculators.CharmDamage.thisArticle}
            </a>
          </NextLink>
          .
        </p>
      </div>
    </Main>
  )
}

export default CharmDamage
