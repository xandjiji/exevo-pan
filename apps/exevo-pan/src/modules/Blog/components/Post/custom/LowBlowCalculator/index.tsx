import { useState } from 'react'
import { Input, Checkbox } from 'components/Atoms'
import Sprite from '../Sprite'
import * as S from './styles'

const LOW_BLOW_MULTIPLIER = 1.09

const ELEMENTAL_DAMAGE = 0.05
const ELEMENTAL_PROC_CHANCE = 0.1
const ELEMENTAL_MULTIPLIER = ELEMENTAL_PROC_CHANCE * ELEMENTAL_DAMAGE
const POWERFUL_MULTIPLIER = 1.05

const SPRITE_PATH = '/sprites/charms'

const LowBlowCalculator = (): JSX.Element => {
  const [averageDamage, setAverageDamage] = useState(500)
  const finalDamageA = Math.round(averageDamage * LOW_BLOW_MULTIPLIER)

  const [creatureHp, setCreatureHp] = useState(2000)
  const [powerful, setPowerful] = useState(false)
  const finalDamageB = Math.round(
    creatureHp * ELEMENTAL_MULTIPLIER +
      averageDamage * (powerful ? POWERFUL_MULTIPLIER : 1),
  )

  return (
    <S.Wrapper>
      <S.Group>
        <S.GroupTitle style={{ marginLeft: -5 }}>
          <Sprite src={`${SPRITE_PATH}/Low Blow.png`} width={32} height={32}>
            Low Blow
          </Sprite>
          {' + '}
          <Sprite src="/sprites/crit.png" width={37} height={30}>
            Powerful Strike
          </Sprite>
        </S.GroupTitle>

        <S.Label>
          Your average damage
          <Input
            type="number"
            step={100}
            min={0}
            value={averageDamage}
            onChange={(event) => setAverageDamage(+event.target.value)}
            hasAlert={false}
          />
        </S.Label>

        <S.Result>
          Final average damage: <code>{finalDamageA}</code>
        </S.Result>
      </S.Group>

      <S.Group>
        <S.GroupTitle style={{ marginLeft: -2 }}>
          <Sprite src={`${SPRITE_PATH}/Charm.png`} width={32} height={32}>
            Elemental charm
          </Sprite>
        </S.GroupTitle>

        <S.Label>
          Creature HP
          <Input
            type="number"
            step={100}
            min={0}
            value={creatureHp}
            onChange={(event) => setCreatureHp(+event.target.value)}
            hasAlert={false}
          />
        </S.Label>

        <Checkbox
          label="Powerful Strike imbuement"
          checked={powerful}
          onClick={() => setPowerful((prev) => !prev)}
        />

        <S.Result>
          Final average damage: <code>{finalDamageB}</code>
        </S.Result>
      </S.Group>
    </S.Wrapper>
  )
}

export default LowBlowCalculator
