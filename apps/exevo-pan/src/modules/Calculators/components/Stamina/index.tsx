import { TimeInput } from 'components/Atoms'
import useTime from './useTime'
import { Main, LabeledCard } from '../layout'

/* @ ToDo:
-calculator
-results
-i18n
-stamina bar?
*/

const Stamina = () => {
  const [currentStamina, setCurrentStamina] = useTime('39:00')
  const [targetStamina, setTargetStamina] = useTime('42:00')

  return (
    <Main>
      <LabeledCard labelText="Stamina">
        <TimeInput
          label="Current stamina"
          max={42}
          value={currentStamina.time}
          onChange={(e) => setCurrentStamina(e.target.value)}
          noAlert
        />

        <TimeInput
          label="Desired stamina"
          max={42}
          value={targetStamina.time}
          onChange={(e) => setTargetStamina(e.target.value)}
          noAlert
        />
      </LabeledCard>
    </Main>
  )
}

export default Stamina
