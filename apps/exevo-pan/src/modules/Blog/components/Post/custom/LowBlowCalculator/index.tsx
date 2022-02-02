import { useState } from 'react'
import { Input, Checkbox } from 'components/Atoms'
import * as S from './styles'

const LOW_BLOW_DAMAGE_MULTIPLIER = 1.09

const LowBlowCalculator = (): JSX.Element => {
  const [creatureHp, setCreatureHp] = useState(2000)
  const [elementalPowerfulStrike, setElementalPowerfulStrike] = useState(true)

  const [averageDamage, setAverageDamage] = useState(500)

  return (
    <S.Wrapper>
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
        checked={elementalPowerfulStrike}
        onClick={() => setElementalPowerfulStrike((prev) => !prev)}
      />
      <p>
        Your average damage with an elemental charm would be:{' '}
        {averageDamage * LOW_BLOW_DAMAGE_MULTIPLIER}
      </p>

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
      <p>
        Your average damage with Low Blow would be:{' '}
        {averageDamage * LOW_BLOW_DAMAGE_MULTIPLIER}
      </p>

      <Checkbox label="Powerful Strike imbuement" />
    </S.Wrapper>
  )
}

export default LowBlowCalculator
