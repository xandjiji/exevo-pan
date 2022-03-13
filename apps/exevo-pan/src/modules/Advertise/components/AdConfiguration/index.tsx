import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Discount from './Discount'
import Summary from '../Summary'
import { useForm } from '../../contexts/Form'
import * as S from './styles'

const AdConfiguration = (): JSX.Element => {
  const { selectedDates, paymentMethod } = useForm()

  const daysCount = selectedDates.length
  return (
    <S.Wrapper>
      <RangeDatePicker />
      <PaymentMethods />
      <Discount daysCount={daysCount} paymentMethod={paymentMethod} />
      <Summary />
    </S.Wrapper>
  )
}

export default AdConfiguration
