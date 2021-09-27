import { useForm } from '../../../contexts/Form'
import EmailInput from './EmailInput'
import NicknameInput from './NicknameInput'
import * as S from './styles'

const UserData = (): JSX.Element => {
  const { paymentMethod } = useForm()

  return (
    <S.Wrapper>
      <S.Title>Your information</S.Title>
      <EmailInput />
      {paymentMethod === 'TIBIA_COINS' && <NicknameInput />}
    </S.Wrapper>
  )
}

export default UserData
