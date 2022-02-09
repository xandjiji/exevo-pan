import { useTranslations } from 'contexts/useTranslation'
import { useForm } from '../../../contexts/Form'
import { calculatePrice, readablePrice, getDiscountTier } from '../../../utils'
import * as S from './styles'

const Discount = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

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
  const noDiscount = daysCount <= 1

  return (
    <S.Wrapper>
      <S.Title>
        <S.OfferIcon />
        {advertise.Discount.title}
      </S.Title>

      <S.Group>
        <S.Small>{advertise.Discount.description}</S.Small>
        <S.OfferWrapper>
          <S.Strong>{readableOffer}</S.Strong>{' '}
          <S.Striked aria-hidden={noDiscount}>
            {readableOriginalPrice}
          </S.Striked>{' '}
          <S.DiscountTag aria-hidden={noDiscount}>
            -{offPercentage}
          </S.DiscountTag>
        </S.OfferWrapper>
      </S.Group>

      <S.Group>
        <S.Small>Tier {discountTier}</S.Small>
        <S.Bar>
          <S.TierSeparator style={{ left: S.TIER_2_WIDTH }} />
          <S.TierSeparator style={{ left: S.TIER_3_WIDTH }} />
          <S.Fill
            data-tier={discountTier}
            data-progress={daysCount}
            data-empty={daysCount === 0}
          />
        </S.Bar>
      </S.Group>
    </S.Wrapper>
  )
}

export default Discount
