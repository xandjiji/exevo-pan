import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { mmddyyyy2ddmmyyy, sortStringDates } from 'utils'
import { useForm } from '../../contexts/Form'
import { calculatePrice, readablePrice } from '../../utils'
import * as S from './styles'

const Summary = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { selectedCharacter, selectedDates, paymentMethod } = useForm()

  const formattedDates = useMemo(
    () => selectedDates.map(mmddyyyy2ddmmyyy).sort(sortStringDates),
    [selectedDates],
  )

  return (
    <S.Wrapper>
      <S.Title>
        <S.ReceiptIcon />
        {advertise.PaymentDetails.Summary.title}
      </S.Title>

      <S.GroupItem>
        <S.Strong>
          {selectedCharacter?.nickname}{' '}
          <S.AuctionLink
            href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${selectedCharacter?.id}&source=overview`}
            target="_blank"
            rel="noreferrer noopener"
          >
            (#{selectedCharacter?.id})
          </S.AuctionLink>
        </S.Strong>
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
                  {formattedDates.map((fullDate) => (
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
          {readablePrice.full[paymentMethod](
            calculatePrice(selectedDates.length, paymentMethod).totalPrice,
          )}
        </S.Strong>
        <S.SubText>{advertise.PaymentDetails.Summary.costText}</S.SubText>
      </S.GroupItem>
    </S.Wrapper>
  )
}

export default Summary
