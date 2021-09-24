import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Receipt from './Receipt'
import * as S from './styles'

const AdConfiguration = (): JSX.Element => (
  <S.Wrapper>
    <RangeDatePicker />
    <PaymentMethods />
    <Receipt />
  </S.Wrapper>
)

export default AdConfiguration
