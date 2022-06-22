import { useStoredState } from 'hooks'
import { Main } from '../layout'
import CharacterConfig from './CharacterConfig'
import Summary from './Summary'

const ExerciseWeapons = () => {
  const [pointsRequired, setPointsRequired] = useStoredState(
    'ew-pointsRequired',
    0,
  )

  return (
    <Main>
      <div className="grid gap-6 lg:grid-cols-2">
        <CharacterConfig updatePointsRequired={setPointsRequired} />
        <Summary pointsRequired={Math.max(pointsRequired, 0)} />
      </div>
    </Main>
  )
}

export default ExerciseWeapons
