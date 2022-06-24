import { useState } from 'react'
import { Input, Checkbox } from 'components/Atoms'
import { useRouter } from 'next/router'
import { Main, LabeledCard } from '../layout'
import { Chip, Group } from '../atoms'
import * as S from './atoms'

const LOW_BLOW_MULTIPLIER = 1.09

const ELEMENTAL_DAMAGE = 0.05
const ELEMENTAL_PROC_CHANCE = 0.1
const ELEMENTAL_MULTIPLIER = ELEMENTAL_PROC_CHANCE * ELEMENTAL_DAMAGE
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

- add powerful strike checkbox to low blow
- slider % bonus damage (both?)
- separate average damage box
*/

export const Calculator = () => {
  const [averageDamage, setAverageDamage] = useState(500)
  const finalDamageA = Math.round(averageDamage * LOW_BLOW_MULTIPLIER)

  const [creatureHp, setCreatureHp] = useState(2000)
  const [powerful, setPowerful] = useState(false)
  const finalDamageB = Math.round(
    creatureHp * ELEMENTAL_MULTIPLIER +
      averageDamage * (powerful ? POWERFUL_MULTIPLIER : 1),
  )

  const { locale } = useRouter()

  return (
    <>
      <LabeledCard noBackground labelText="Low Blow">
        <Input
          label={translations[locale as RegisteredLocale].yourAverageDamage}
          type="number"
          step={100}
          min={0}
          value={averageDamage}
          onChange={(event) => setAverageDamage(+event.target.value)}
          noAlert
        />

        <Checkbox
          label="Powerful Strike imbuement"
          checked={powerful}
          onClick={() => setPowerful((prev) => !prev)}
        />

        <Group>
          <strong>
            {translations[locale as RegisteredLocale].finalAverageDamage}:
          </strong>
          <Chip>{finalDamageA}</Chip>
        </Group>
      </LabeledCard>

      <LabeledCard
        noBackground
        labelText={translations[locale as RegisteredLocale].elementalCharm}
      >
        <Input
          label={translations[locale as RegisteredLocale].creatureHP}
          type="number"
          step={100}
          min={0}
          value={creatureHp}
          onChange={(event) => setCreatureHp(+event.target.value)}
          noAlert
        />

        <Checkbox
          label="Powerful Strike imbuement"
          checked={powerful}
          onClick={() => setPowerful((prev) => !prev)}
        />

        <Group>
          <strong>
            {translations[locale as RegisteredLocale].finalAverageDamage}:
          </strong>
          <Chip>{finalDamageB}</Chip>
        </Group>
      </LabeledCard>
    </>
  )
}

const LowBlow = () => (
  <Main>
    <div className="child:bg-background grid gap-6 lg:grid-cols-2">
      <Calculator />
    </div>
  </Main>
)

export default LowBlow
