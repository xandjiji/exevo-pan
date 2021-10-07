import { useTranslations } from 'contexts/useTranslation'
import { useForm } from '../../contexts/Form'
import { calculatePrice } from './utils'
import * as S from './styles'

const Summary = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { selectedCharacter, selectedDates, paymentMethod } = useForm()

  return (
    <S.Wrapper>
      <S.Title>
        <S.ReceiptIcon />
        {advertise.PaymentDetails.Summary.title}
      </S.Title>

      <S.GroupItem>
        <S.Strong>{selectedCharacter?.nickname}</S.Strong>
        <S.SubText>
          {advertise.PaymentDetails.Summary.auctionedCharacter}
        </S.SubText>
      </S.GroupItem>

      <S.GroupItem>
        <S.Strong>
          {selectedDates.length}{' '}
          <S.Tooltip
            content={
              <>
                <S.TooltipTitle>
                  {advertise.PaymentDetails.Summary.datesTooltipText}
                </S.TooltipTitle>
                <S.AllDates>
                  {selectedDates.map((fullDate) => (
                    <S.FullDate key={fullDate}>{fullDate}</S.FullDate>
                  ))}
                </S.AllDates>
              </>
            }
          >
            <S.Highlight>
              {
                advertise.PaymentDetails.Summary[
                  selectedDates.length > 1 ? 'days' : 'day'
                ]
              }
            </S.Highlight>
          </S.Tooltip>
        </S.Strong>
        <S.SubText>{advertise.PaymentDetails.Summary.durationText}</S.SubText>
      </S.GroupItem>

      <S.GroupItem>
        <S.Strong>
          {calculatePrice(selectedDates.length, paymentMethod)}
        </S.Strong>
        <S.SubText>{advertise.PaymentDetails.Summary.costText}</S.SubText>
      </S.GroupItem>
    </S.Wrapper>
  )
}

export default Summary
