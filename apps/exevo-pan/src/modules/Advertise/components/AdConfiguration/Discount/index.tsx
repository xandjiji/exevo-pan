import { useForm } from '../../../contexts/Form'
import { calculatePrice, readablePrice, getDiscountTier } from '../../../utils'
import * as S from './styles'

const Discount = (): JSX.Element => {
  const { selectedDates, paymentMethod } = useForm()
  const daysCount = selectedDates.length

  const { totalPrice, saved, offPercentage } = calculatePrice(
    daysCount,
    paymentMethod,
  )

  const readableOffer = readablePrice.short[paymentMethod](totalPrice)
  const readableOriginalPrice = readablePrice.short[paymentMethod](
    totalPrice + saved,
  )

  const discountTier = getDiscountTier(daysCount)

  return (
    <S.Wrapper>
      <S.Title>
        <S.OfferIcon />
        Desconto
      </S.Title>

      <S.Group>
        <S.Small>Aproveite nossos descontos progressivos!</S.Small>
        <S.OfferWrapper>
          <S.Strong>{readableOffer}</S.Strong>{' '}
          <S.Striked>{readableOriginalPrice}</S.Striked>{' '}
          <S.DiscountTag>-{offPercentage}</S.DiscountTag>
        </S.OfferWrapper>
      </S.Group>

      <S.Group>
        <S.Small>Tier {discountTier}</S.Small>
        <S.Bar>
          <S.TierSeparator style={{ left: '60%' }} />
          <S.TierSeparator style={{ left: '90%' }} />
          <S.Fill data-tier={discountTier} data-progress={daysCount} />
        </S.Bar>
      </S.Group>
    </S.Wrapper>
  )
}

export default Discount
