import { useState, useMemo } from 'react'
import { Checkbox, Text, Chip } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { Card } from '../../layout'
import {
  autoRequiredWeaponsCount,
  customRequiredWeaponsCount,
  calculateCost,
  secondsToTimeObject,
} from './utils'
import { weaponOptions } from './options'
import * as S from './atoms'
import * as CONSTANTS from './constants'
import { SummaryProps, WeaponOption, WeaponsObject } from './types'

/* @ ToDo:
- Equivalente a X tempo offline

*/

const Summary = ({ pointsRequired }: SummaryProps) => {
  const [hasDummy, setHasDummy] = useState(false)
  const [isDouble, setIsDouble] = useState(false)
  const [exerciseWeapon, setExerciseWeapon] = useState<WeaponOption>('auto')

  const weaponsRequired: WeaponsObject = useMemo(() => {
    const finalPointsRequired =
      pointsRequired /
      (hasDummy ? CONSTANTS.DIVIDER.hasDummy : 1) /
      (isDouble ? CONSTANTS.DIVIDER.isDouble : 1)

    return exerciseWeapon === 'auto'
      ? autoRequiredWeaponsCount(finalPointsRequired)
      : customRequiredWeaponsCount(finalPointsRequired, exerciseWeapon)
  }, [pointsRequired, hasDummy, isDouble, exerciseWeapon])

  const cost = useMemo(() => calculateCost(weaponsRequired), [weaponsRequired])

  const timeObject = useMemo(
    () => secondsToTimeObject(cost.seconds),
    [cost.seconds],
  )

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-4">
          <Checkbox
            label="Exercise dummy"
            checked={hasDummy}
            onChange={(e) => setHasDummy(e.target.checked)}
          />
          <Checkbox
            label="Double event"
            checked={isDouble}
            onChange={(e) => setIsDouble(e.target.checked)}
          />
        </div>

        <Select
          label="Weapon charges"
          options={weaponOptions}
          value={exerciseWeapon}
          onChange={(e) => setExerciseWeapon(e.target.value as WeaponOption)}
          noAlert
          className="w-[180px]"
        />
      </div>

      <S.Group>
        <p>
          <strong>Money cost</strong>
        </p>
        <S.ChipWrapper>
          <Chip>
            <Text.TibiaCoin value={cost.tc} />
          </Chip>
          <small className="-mx-2.5 font-light">or</small>
          <Chip>
            <Text.GoldCoin value={cost.gold} />
          </Chip>
        </S.ChipWrapper>
      </S.Group>

      <S.Group>
        <p>
          <strong>Weapons</strong>
        </p>
        <S.ChipWrapper>
          {!!weaponsRequired.lasting && (
            <Chip>
              <S.Weapon.lasting /> lasting weapons
              <S.ActiveCount>{weaponsRequired.lasting}x</S.ActiveCount>
            </Chip>
          )}
          {!!weaponsRequired.durable && (
            <Chip>
              <S.Weapon.durable /> durable weapons
              <S.ActiveCount>{weaponsRequired.durable}x</S.ActiveCount>
            </Chip>
          )}
          {!!weaponsRequired.regular && (
            <Chip>
              <S.Weapon.regular /> regular weapons
              <S.ActiveCount>{weaponsRequired.regular}x</S.ActiveCount>
            </Chip>
          )}
          {!Object.values(weaponsRequired).some((amount) => amount > 0) && (
            <small>None</small>
          )}
        </S.ChipWrapper>
      </S.Group>

      <S.Group>
        <p>
          <strong>Time required</strong>
        </p>
        <div className="grid w-fit auto-cols-fr grid-flow-col gap-4">
          {!!timeObject && (
            <S.TimeBubble time={timeObject.days}>days</S.TimeBubble>
          )}
          {!!timeObject && (
            <S.TimeBubble time={timeObject.hours}>hours</S.TimeBubble>
          )}
          {!!timeObject && (
            <S.TimeBubble time={timeObject.minutes}>minutes</S.TimeBubble>
          )}
        </div>
      </S.Group>
    </Card>
  )
}

export default Summary
