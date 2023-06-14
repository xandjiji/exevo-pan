import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Stepper } from 'components/Atoms'
import { useForm } from './contexts/Form'
import {
  AuctionSearch,
  AdConfiguration,
  Checkout,
  CharacterCard,
  PaymentDetails,
} from './components'
import styles from './styles.module.css'

export const Form = () => {
  const { advertise } = useTranslations()

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
      <Stepper
        isFinished={finished}
        steps={stepItems}
        currentStep={currentStep}
        className={clsx(
          'mx-auto mb-[22px] max-w-[420px] px-10 md:max-w-[560px]',
        )}
      />
      <div
        className={clsx(
          'md:flex md:justify-center md:gap-6 lg:gap-[60px]',
          styles.formStepWrapper,
        )}
      >
        {FormSteps[currentStep]}
        <CharacterCard />
      </div>
    </>
  )
}

export { FormProvider } from './contexts/Form'
