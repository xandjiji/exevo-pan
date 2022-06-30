export type TimeObject = {
  time: string
  seconds: number
}

export type TrackData = {
  key: string
  name: string
  currentStamina: TimeObject
  targetStamina: TimeObject
  timestamp: number
}

export type AddArgs = Pick<TrackData, 'currentStamina' | 'targetStamina'>

export type UpdateArgs = Pick<TrackData, 'key'> &
  Partial<Omit<TrackData, 'key'>>
