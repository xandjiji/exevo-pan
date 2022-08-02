export type ExerciseWeapon = 'regular' | 'durable' | 'lasting'

export type WeaponOption = 'auto' | ExerciseWeapon

export type WeaponsObject = Record<ExerciseWeapon, number>

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'melee' | 'distance'
