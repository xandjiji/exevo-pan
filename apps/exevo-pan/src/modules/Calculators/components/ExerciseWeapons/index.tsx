import { useState } from 'react'
import CharacterConfig from './CharacterConfig'
import Summary from './Summary'

export const ExerciseWeapons = () => {
  const [pointsRequired, setPointsRequired] = useState(0)

  return (
    <div>
      <CharacterConfig updatePointsRequired={setPointsRequired} />
      <Summary pointsRequired={pointsRequired} />
    </div>
  )
}
