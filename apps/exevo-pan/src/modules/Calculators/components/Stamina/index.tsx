import { TimeInput } from 'components/Atoms'
import useStamina from './useStamina'
import { Main, LabeledCard } from '../layout'

const Stamina = () => {
  const [currentStamina, setCurrentStamina] = useStamina('39:00')
  const [targetStamina, setTargetStamina] = useStamina('42:00')

  return (
    <Main>
      <LabeledCard labelText="Stamina">
        <TimeInput
          label="Current stamina"
          max={42}
          value={currentStamina}
          onChange={(e) => setCurrentStamina(e.target.value)}
          noAlert
        />

        <TimeInput
          label="Desired stamina"
          max={42}
          value={targetStamina}
          onChange={(e) => setTargetStamina(e.target.value)}
          noAlert
        />
      </LabeledCard>
    </Main>
  )
}

export default Stamina
