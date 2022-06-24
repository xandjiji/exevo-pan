import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Input, Checkbox, Slider } from 'components/Atoms'
import { useRouter } from 'next/router'
import { Main, LabeledCard } from '../layout'
import { Chip, Group } from '../atoms'

const LOW_BLOW_MULTIPLIER = 1.09

const ELEMENTAL_DAMAGE = 0.05
const ELEMENTAL_PROC_CHANCE = 0.1
const POWERFUL_MULTIPLIER = 1.05

const translations = {
  en: {
    yourAverageDamage: 'Your average damage',
    finalAverageDamage: 'Final average damage',
    elementalCharm: 'Elemental charm',
    creatureHP: 'Creature HP',
  },
  es: {
    yourAverageDamage: 'Tu daño promedio',
    finalAverageDamage: 'Daño promedio final',
    elementalCharm: 'Charm Elemental',
    creatureHP: 'Vida de la criatura',
  },
  pl: {
    yourAverageDamage: 'Twoje średnie obrażenia',
    finalAverageDamage: 'Końcowe średnie obrażenia',
    elementalCharm: 'Charm ofensywny',
    creatureHP: 'Punkty zdrowia potwora',
  },
  pt: {
    yourAverageDamage: 'Seu dano médio',
    finalAverageDamage: 'Dano médio final',
    elementalCharm: 'Charm elemental',
    creatureHP: 'HP da criatura',
  },
}

/* @ ToDo:

- separar utils
- i18n
*/

const transformBonusResistance = (value: number) =>
  `${value > 0 ? '+' : ''}${value}%`

const SPRITE_PATH = '/sprites/charms'

export const Calculator = () => {
  const [averageDamage, setAverageDamage] = useState(500)

  const lowBlowAverage = useMemo(
    () => Math.round(averageDamage * LOW_BLOW_MULTIPLIER),
    [averageDamage],
  )

  const [creatureHp, setCreatureHp] = useState(2000)
  const [bonusResistance, setBonusResistance] = useState(0)
  const [powerfulB, setPowerfulB] = useState(false)

  const elementalAverage = useMemo(
    () =>
      Math.round(
        creatureHp *
          (ELEMENTAL_PROC_CHANCE *
            (ELEMENTAL_DAMAGE * (1 + bonusResistance / 100))) +
          averageDamage * (powerfulB ? POWERFUL_MULTIPLIER : 1),
      ),
    [averageDamage, creatureHp, bonusResistance, powerfulB],
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
          checked={powerfulB}
          onClick={() => setPowerfulB((prev) => !prev)}
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
          label="Elemental bonus damage:"
          min={0}
          max={100}
          displayValue
          transformDisplayedValues={transformBonusResistance}
          value={bonusResistance}
          onChange={(e) => setBonusResistance(+e.target.value)}
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
