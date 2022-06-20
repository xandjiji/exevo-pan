import { useMemo } from 'react'
import { useStoredState } from 'hooks'
import { useTranslations } from 'contexts/useTranslation'
import { Checkbox, Text } from 'components/Atoms'
import { Select, InfoTooltip, ClientComponent } from 'components/Organisms'
import { isServer } from 'utils'
import { LabeledCard } from '../../layout'
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
  const {
    translations: { calculators },
  } = useTranslations()

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
    <div className="grid gap-6">
      <LabeledCard labelText="Extra">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
            label={calculators.ExerciseWeapons.labels.weaponCharges}
            options={weaponOptions}
            value={exerciseWeapon}
            onChange={(e) => setExerciseWeapon(e.target.value as WeaponOption)}
            noAlert
            className="w-[180px]"
          />
        </div>
      </LabeledCard>

      <LabeledCard labelText={calculators.ExerciseWeapons.labels.results}>
        <S.Group>
          <div className="flex items-center gap-1">
            <strong>{calculators.ExerciseWeapons.labels.moneyCost}</strong>
            <InfoTooltip
              className="h-3 w-3"
              content={
                <span className="block w-36 leading-tight">
                  {calculators.ExerciseWeapons.moneyTooltip.a}{' '}
                  <strong>{calculators.ExerciseWeapons.moneyTooltip.b}</strong>{' '}
                  {calculators.ExerciseWeapons.moneyTooltip.c}{' '}
                  <Text.GoldCoin value={10500} /> gp{' '}
                  {calculators.ExerciseWeapons.moneyTooltip.d}{' '}
                  <strong>{calculators.ExerciseWeapons.moneyTooltip.e}</strong>.
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
            <strong>{calculators.ExerciseWeapons.labels.weapons}</strong>
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
                {calculators.ExerciseWeapons.labels.none}
              </S.Empty>
            </S.ChipWrapper>
          </ClientComponent>
        </S.Group>

        <S.Group>
          <p>
            <strong>{calculators.ExerciseWeapons.labels.time}</strong>
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
              <S.Empty aria-hidden={!isObjectEmpty(timeObject)}>
                {calculators.ExerciseWeapons.labels.none}
              </S.Empty>
            </S.ChipWrapper>
          </ClientComponent>
        </S.Group>
      </LabeledCard>
    </div>
  )
}

export default Summary
