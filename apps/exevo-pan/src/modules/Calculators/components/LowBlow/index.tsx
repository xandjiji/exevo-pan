import { useState } from 'react'
import { Input, Checkbox } from 'components/Atoms'
import { useRouter } from 'next/router'
import Sprite from '../../../Blog/components/Post/custom/Sprite/index'
import * as S from './atoms'

const LOW_BLOW_MULTIPLIER = 1.09

const ELEMENTAL_DAMAGE = 0.05
const ELEMENTAL_PROC_CHANCE = 0.1
const ELEMENTAL_MULTIPLIER = ELEMENTAL_PROC_CHANCE * ELEMENTAL_DAMAGE
const POWERFUL_MULTIPLIER = 1.05

const SPRITE_PATH = '/sprites/charms'

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

const LowBlowCalculator = () => {
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
    <div className="my-2 mx-auto grid max-w-fit gap-6">
      <S.Group>
        <S.Group.Title style={{ marginLeft: -5 }}>
          <Sprite src={`${SPRITE_PATH}/Low Blow.png`} width={32} height={32}>
            Low Blow
          </Sprite>
          {' + '}
          <Sprite src="/sprites/crit.png" width={37} height={30}>
            Powerful Strike
          </Sprite>
        </S.Group.Title>

        <Input
          label={translations[locale as RegisteredLocale].yourAverageDamage}
          type="number"
          step={100}
          min={0}
          value={averageDamage}
          onChange={(event) => setAverageDamage(+event.target.value)}
          noAlert
        />

        <S.Result>
          {translations[locale as RegisteredLocale].finalAverageDamage}:{' '}
          <code>{finalDamageA}</code>
        </S.Result>
      </S.Group>

      <S.Group>
        <S.Group.Title style={{ marginLeft: -2 }}>
          <Sprite src={`${SPRITE_PATH}/Charm.png`} width={32} height={32}>
            {translations[locale as RegisteredLocale].elementalCharm}
          </Sprite>
        </S.Group.Title>

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

        <S.Result>
          {translations[locale as RegisteredLocale].finalAverageDamage}:{' '}
          <code>{finalDamageB}</code>
        </S.Result>
      </S.Group>
    </div>
  )
}

export default LowBlowCalculator
