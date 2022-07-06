import { TrackData, UpdateArgs } from '../useTracking/types'

export type TrackCardProps = {
  index: number
  trackedData: TrackData
  update: (args: UpdateArgs) => void
  remove: (key: string) => void
}
