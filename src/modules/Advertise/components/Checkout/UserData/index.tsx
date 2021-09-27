import EmailInput from './EmailInput'
import NicknameInput from './NicknameInput'
import * as S from './styles'

const UserData = (): JSX.Element => (
  <S.Wrapper>
    <S.Title>Your information</S.Title>
    <EmailInput />
    <NicknameInput />
  </S.Wrapper>
)

export default UserData
