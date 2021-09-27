import EmailInput from './EmailInput'
import * as S from './styles'

const UserData = (): JSX.Element => (
  <S.Wrapper>
    <S.Title>Your information</S.Title>
    <EmailInput />
  </S.Wrapper>
)

export default UserData
