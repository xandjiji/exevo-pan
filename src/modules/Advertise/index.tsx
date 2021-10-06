import { useTranslations } from 'contexts/useTranslation'
import { FormProvider, useForm } from './contexts/Form'
import {
  AuctionSearch,
  AdConfiguration,
  Checkout,
  CharacterCard,
  PaymentDetails,
} from './components'
import * as S from './styles'

const Form = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { currentStep, finished, dispatch } = useForm()

  const setStep = (newStep: number) => {
    if (newStep < currentStep && !finished)
      dispatch({ type: 'SET_STEP', newStep })
  }

  const stepItems = [
    { title: advertise.StepItems.Select, onClick: setStep },
    { title: advertise.StepItems.Configure, onClick: setStep },
    { title: advertise.StepItems.Checkout },
  ]

  const FormSteps = [
    <AuctionSearch />,
    <AdConfiguration />,
    <Checkout />,
    <PaymentDetails />,
  ]

  return (
    <>
      <S.Stepper
        steps={stepItems}
        currentStep={currentStep}
        finished={finished}
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
