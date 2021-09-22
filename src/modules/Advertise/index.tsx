import { FormProvider, useForm } from './contexts/Form'
import { AuctionSearch, CharacterCard } from './components'
import * as S from './styles'

const Form = (): JSX.Element => {
  const { formStep } = useForm()
  console.log(formStep)
  return (
    <>
      <AuctionSearch />
      <CharacterCard />
    </>
  )
}

const AdvertiseGrid = (): JSX.Element => (
  <S.Wrapper>
    <FormProvider>
      <Form />
    </FormProvider>
  </S.Wrapper>
)

export default AdvertiseGrid
