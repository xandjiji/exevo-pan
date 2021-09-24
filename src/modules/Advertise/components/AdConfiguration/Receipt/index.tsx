import { useForm } from '../../../contexts/Form'
import * as S from './styles'

const Receipt = (): JSX.Element => {
  const { selectedCharacter, selectedDates } = useForm()

  return (
    <S.Wrapper>
      <S.Title>
        <S.ReceiptIcon />
        Summary
      </S.Title>

      <S.GroupItem>
        <S.Strong>{selectedCharacter?.nickname}</S.Strong>
        <S.SubText>Auctioned character</S.SubText>
      </S.GroupItem>

      <S.GroupItem>
        <S.Strong>{selectedDates.length} days</S.Strong>
        <S.SubText>Advertising duration</S.SubText>
      </S.GroupItem>

      <S.GroupItem>
        <S.Strong>{selectedDates.length * 50} Tibia Coins</S.Strong>
        <S.SubText>Total cost</S.SubText>
      </S.GroupItem>
    </S.Wrapper>
  )
}

export default Receipt
