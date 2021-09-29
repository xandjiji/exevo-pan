import { FormProvider, useForm } from './contexts/Form'
import {
  AuctionSearch,
  AdConfiguration,
  Checkout,
  CharacterCard,
} from './components'
import * as S from './styles'

const Form = (): JSX.Element => {
  const { currentStep, dispatch } = useForm()

  const setStep = (newStep: number) => {
    if (newStep < currentStep && currentStep <= 2)
      dispatch({ type: 'SET_STEP', newStep })
  }

  const stepItems = [
    { title: 'Select', onClick: setStep },
    { title: 'Configure', onClick: setStep },
    { title: 'Checkout' },
  ]

  const FormSteps = [<AuctionSearch />, <AdConfiguration />, <Checkout />]

  return (
    <>
      <S.Stepper
        steps={stepItems}
        currentStep={currentStep}
        finished={currentStep > 2}
      />
      <S.FormStepsWrapper>
        {FormSteps[currentStep]}
        <CharacterCard />
      </S.FormStepsWrapper>
    </>
  )
}

const AdvertiseGrid = (): JSX.Element => (
  <FormProvider>
    <S.Wrapper id="main-wrapper">
      <Form />
    </S.Wrapper>
  </FormProvider>
)

export default AdvertiseGrid
