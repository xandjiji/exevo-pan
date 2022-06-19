export type SummaryProps = {
  pointsRequired: number
}
export type TypedOption<T> = {
  value: T
} & Omit<Option, 'value'>

export type ExerciseWeapon = 'regular' | 'durable' | 'lasting'

export type WeaponOption = 'auto' | ExerciseWeapon

export type WeaponsObject = Record<ExerciseWeapon, number>

export type TimeBubbleProps = {
  time: number | string
} & JSX.IntrinsicElements['div']
