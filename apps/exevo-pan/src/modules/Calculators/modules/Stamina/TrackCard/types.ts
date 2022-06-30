import { TrackData, UpdateArgs } from '../useTracking/types'

export type TrackCardProps = {
  trackedData: TrackData
  update: (args: UpdateArgs) => void
}
