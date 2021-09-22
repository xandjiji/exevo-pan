import { FormProvider, useForm } from './contexts/Form'
import { AuctionSearch, RangeDatePicker, CharacterCard } from './components'
import * as S from './styles'

const Form = (): JSX.Element => {
  const { currentStep } = useForm()

  const FormSteps = [<AuctionSearch />, <RangeDatePicker />]

  return (
    <>
      {FormSteps[currentStep]}
      <CharacterCard />
    </>
  )
}

const AdvertiseGrid = (): JSX.Element => (
  <S.Wrapper id="main-wrapper">
    <FormProvider>
      <Form />
    </FormProvider>
  </S.Wrapper>
)

export default AdvertiseGrid
