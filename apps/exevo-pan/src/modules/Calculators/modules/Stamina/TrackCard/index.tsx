import { useMemo } from 'react'
import StaminaBar from '../StaminaBar'
import { regenerateStamina, seconds2Time } from './utils'
import { TrackCardProps } from './types'

/* @ ToDo:
- rest time left
- delete action
- name change
- force rerender every 3 minutes? retirar memos
*/

const TrackCard = ({ trackedData }: TrackCardProps) => {
  const { key, name, currentStamina, targetStamina, timestamp } = trackedData

  const updatedStamina = useMemo(() => {
    const secondsPassed = Math.round((+new Date() - timestamp) / 1000)

    return regenerateStamina(currentStamina.seconds, secondsPassed)
  }, [timestamp, currentStamina.seconds])

  const updatedTime = useMemo(
    () => seconds2Time(updatedStamina),
    [updatedStamina],
  )

  return (
    <div className="card">
      <StaminaBar time={updatedTime} mark={targetStamina.time} />
    </div>
  )
}

export default TrackCard
