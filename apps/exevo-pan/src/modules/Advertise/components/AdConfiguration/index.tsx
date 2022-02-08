import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Discount from './Discount'
import Summary from '../Summary'
import * as S from './styles'

const AdConfiguration = (): JSX.Element => (
  <S.Wrapper>
    <RangeDatePicker />
    <PaymentMethods />
    <Discount />
    <Summary />
  </S.Wrapper>
)

export default AdConfiguration
