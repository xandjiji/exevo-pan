import { useStoredState } from 'hooks'
import CharacterConfig from './CharacterConfig'
import Summary from './Summary'

export const ExerciseWeapons = () => {
  const [pointsRequired, setPointsRequired] = useStoredState(
    'ew-pointsRequired',
    0,
  )

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <CharacterConfig updatePointsRequired={setPointsRequired} />
      <Summary pointsRequired={pointsRequired} />
    </div>
  )
}
