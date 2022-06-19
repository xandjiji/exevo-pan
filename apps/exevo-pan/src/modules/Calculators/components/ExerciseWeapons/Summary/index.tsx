import { useMemo } from 'react'
import { useStoredState } from 'hooks'
import { Checkbox, Text } from 'components/Atoms'
import { Select, InfoTooltip, ClientComponent } from 'components/Organisms'
import { isServer } from 'utils'
import { Card } from '../../layout'
import {
  autoRequiredWeaponsCount,
  customRequiredWeaponsCount,
  calculateCost,
  secondsToTimeObject,
  isObjectEmpty,
} from './utils'
import { weaponOptions } from './options'
import * as S from './atoms'
import * as CONSTANTS from './constants'
import { SummaryProps, WeaponOption, WeaponsObject } from './types'

const Summary = ({ pointsRequired }: SummaryProps) => {
  const [hasDummy, setHasDummy] = useStoredState('ew-dummy', false)
  const [isDouble, setIsDouble] = useStoredState('ew-double', false)
  const [exerciseWeapon, setExerciseWeapon] = useStoredState<WeaponOption>(
    'ew-exerciseWeapon',
    'auto',
  )

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

  const isClient = !isServer()

  return (
    <Card>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <ClientComponent className="grid gap-4">
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
        </ClientComponent>

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
        <div className="flex items-center gap-1">
          <strong>Money cost</strong>
          <InfoTooltip
            className="h-3 w-3"
            content={
              <span className="block w-36 leading-tight">
                If the TC price is <strong>higher</strong> than{' '}
                <Text.GoldCoin value={10500} /> gp then you should buy exercise
                weapons using <strong>gold</strong>.
              </span>
            }
          />
        </div>
        <S.ChipWrapper className="shrink-0 flex-wrap">
          <S.Chip>
            <Text.TibiaCoin value={cost.tc} />
          </S.Chip>
          <small className="-mx-2.5 font-light">or</small>
          <S.Chip>
            <Text.GoldCoin value={cost.gold} />
          </S.Chip>
        </S.ChipWrapper>
      </S.Group>

      <S.Group>
        <p>
          <strong>Weapons</strong>
        </p>
        <ClientComponent>
          <S.ChipWrapper className="flex-wrap">
            <S.Chip aria-hidden={!weaponsRequired.lasting}>
              <S.Weapon.lasting /> lasting weapons
              <S.ActiveCount>{weaponsRequired.lasting}x</S.ActiveCount>
            </S.Chip>
            <S.Chip aria-hidden={!weaponsRequired.durable}>
              <S.Weapon.durable /> durable weapons
              <S.ActiveCount>{weaponsRequired.durable}x</S.ActiveCount>
            </S.Chip>
            <S.Chip aria-hidden={!weaponsRequired.regular}>
              <S.Weapon.regular /> regular weapons
              <S.ActiveCount>{weaponsRequired.regular}x</S.ActiveCount>
            </S.Chip>
            <S.Empty aria-hidden={!isObjectEmpty(weaponsRequired)}>
              None
            </S.Empty>
          </S.ChipWrapper>
        </ClientComponent>
      </S.Group>

      <S.Group>
        <p>
          <strong>Time required</strong>
        </p>
        <ClientComponent>
          <S.ChipWrapper>
            <S.TimeBubble
              time={timeObject.days}
              aria-hidden={isClient && !timeObject.days}
            >
              days
            </S.TimeBubble>
            <S.TimeBubble
              time={timeObject.hours}
              aria-hidden={!timeObject.hours}
            >
              hours
            </S.TimeBubble>
            <S.TimeBubble
              time={timeObject.minutes}
              aria-hidden={!timeObject.minutes}
            >
              minutes
            </S.TimeBubble>
            <S.Empty aria-hidden={!isObjectEmpty(timeObject)}>None</S.Empty>
          </S.ChipWrapper>
        </ClientComponent>
      </S.Group>
    </Card>
  )
}

export default Summary
