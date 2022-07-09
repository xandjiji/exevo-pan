export type SummaryProps = {
  pointsRequired: number
}

export type ExerciseWeapon = 'regular' | 'durable' | 'lasting'

export type WeaponOption = 'auto' | ExerciseWeapon

export type WeaponsObject = Record<ExerciseWeapon, number>
