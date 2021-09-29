import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Summary from '../Summary'
import * as S from './styles'

const AdConfiguration = (): JSX.Element => (
  <S.Wrapper>
    <RangeDatePicker />
    <PaymentMethods />
    <Summary />
  </S.Wrapper>
)

export default AdConfiguration
