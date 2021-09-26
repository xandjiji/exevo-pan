import { useForm } from '../../../contexts/Form'
import { calculatePrice } from './utils'
import * as S from './styles'

const Summary = (): JSX.Element => {
  const { selectedCharacter, selectedDates, paymentMethod } = useForm()

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
        <S.Strong>
          {selectedDates.length}{' '}
          <S.Tooltip
            content={
              <>
                <S.TooltipTitle>
                  Your auction will be highlighted during the following days:
                </S.TooltipTitle>
                <S.AllDates>
                  {selectedDates.map((fullDate) => (
                    <S.FullDate key={fullDate}>{fullDate}</S.FullDate>
                  ))}
                </S.AllDates>
              </>
            }
          >
            <S.Highlight>days</S.Highlight>
          </S.Tooltip>
        </S.Strong>
        <S.SubText>Advertising duration</S.SubText>
      </S.GroupItem>

      <S.GroupItem>
        <S.Strong>
          {calculatePrice(selectedDates.length, paymentMethod)}
        </S.Strong>
        <S.SubText>Total cost</S.SubText>
      </S.GroupItem>
    </S.Wrapper>
  )
}

export default Summary
