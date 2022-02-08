import { useForm } from '../../../contexts/Form'
import { calculatePrice, readablePrice } from '../../../utils'
import * as S from './styles'

const Discount = (): JSX.Element => {
  const { selectedDates, paymentMethod } = useForm()

  const { totalPrice, saved, offPercentage } = calculatePrice(
    selectedDates.length,
    paymentMethod,
  )

  const readableOffer = readablePrice.short[paymentMethod](totalPrice)
  const readableOriginalPrice = readablePrice.short[paymentMethod](
    totalPrice + saved,
  )

  return (
    <S.Wrapper>
      <S.Title>
        <S.OfferIcon />
        Desconto
      </S.Title>

      <S.OfferWrapper>
        <S.Strong>{readableOffer}</S.Strong>{' '}
        <S.Striked>{readableOriginalPrice}</S.Striked>{' '}
        <S.DiscountTag>-{offPercentage}</S.DiscountTag>
      </S.OfferWrapper>
    </S.Wrapper>
  )
}

export default Discount
