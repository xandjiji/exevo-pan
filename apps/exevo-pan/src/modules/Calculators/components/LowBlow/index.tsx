import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Input, Checkbox, Slider } from 'components/Atoms'
import { useRouter } from 'next/router'
import { Main, LabeledCard } from '../layout'
import { Chip, Group } from '../atoms'
import {
  LOW_BLOW_MULTIPLIER,
  ELEMENTAL_DAMAGE,
  ELEMENTAL_PROC_CHANCE,
  POWERFUL_MULTIPLIER,
  SPRITE_PATH,
} from './constants'
import { translations } from './locales'

const transformBonusResistance = (value: number) =>
  `${value > 0 ? '+' : ''}${value}%`

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

  const { locale: untypedLocale } = useRouter()
  const locale = untypedLocale as RegisteredLocale

  return (
    <>
      <Input
        label={translations[locale].yourAverageDamage}
        type="number"
        step={100}
        min={0}
        value={averageDamage}
        onChange={(e) => setAverageDamage(+e.target.value)}
        noAlert
      />

      <LabeledCard noBackground labelText="Low Blow + Powerful Strike">
        <Group>
          <strong>{translations[locale].finalAverageDamage}:</strong>
          <Chip>
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

      <LabeledCard noBackground labelText={translations[locale].elementalCharm}>
        <Checkbox
          label="Powerful Strike imbuement"
          checked={powerful}
          onClick={() => setPowerful((prev) => !prev)}
        />

        <Input
          label={translations[locale].creatureHP}
          type="number"
          step={100}
          min={0}
          value={creatureHp}
          onChange={(e) => setCreatureHp(+e.target.value)}
          noAlert
        />

        <Slider
          label={`${translations[locale].elementalBonus}:`}
          min={0}
          max={100}
          displayValue
          transformDisplayedValues={transformBonusResistance}
          value={bonusResistance}
          onChange={(e) => setBonusResistance(+e.target.value)}
          className="sm:min-w-[230px]"
        />

        <Group>
          <strong>{translations[locale].finalAverageDamage}:</strong>
          <Chip>
            <Image
              src={`${SPRITE_PATH}/Charm.png`}
              width={16}
              height={16}
              alt={translations[locale].elementalCharm}
            />
            {elementalAverage}
          </Chip>
        </Group>
      </LabeledCard>
    </>
  )
}

const LowBlow = () => (
  <Main>
    <div className="child:bg-background grid gap-6">
      <Calculator />
    </div>
  </Main>
)

export default LowBlow
