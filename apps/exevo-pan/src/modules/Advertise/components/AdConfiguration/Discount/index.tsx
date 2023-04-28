import clsx from 'clsx'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { OfferIcon } from 'assets/svgs'
import { Checkbox } from 'components/Atoms'
import NextLink from 'next/link'
import { advertising, routes } from 'Constants'
import { calculatePrice, readablePrice, getDiscountTier } from '../../../utils'
import * as S from './atoms'
import { DiscountProps } from './types'

const Discount = ({ daysCount, paymentMethod, isPro }: DiscountProps) => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { totalPrice, saved, offPercentage } = calculatePrice({
    days: daysCount,
    paymentMethod,
    isPro,
  })

  const proDiscount =
    advertising.unitPrice[paymentMethod === 'PIX' ? 'BRL' : 'TIBIA_COINS']
  const readableDiscount = `-${readablePrice.short[paymentMethod](proDiscount)}`

  const readableOffer = readablePrice.short[paymentMethod](totalPrice)
  const readableOriginalPrice = readablePrice.short[paymentMethod](
    totalPrice + saved,
  )

  const discountTier = getDiscountTier(daysCount)
  const noDiscount = daysCount <= 1

  return (
    <div className="card grid gap-4 p-4">
      <h2
        className="border-separator -mb-1 flex items-center border-solid pb-1 text-2xl"
        style={{ borderWidth: 0, borderBottomWidth: 1 }}
      >
        <OfferIcon className="fill-onSurface mr-1.5 transition-colors" />
        {advertise.Discount.title}
      </h2>

      <NextLink
        href={routes.EXEVOPRO}
        className={clsx(
          'text-onSurface',
          isPro ? 'pointer-events-none' : 'child:!cursor-pointer',
        )}
      >
        <Checkbox
          label={
            <p>
              {templateMessage(
                advertise.Discount[isPro ? 'proDiscount' : 'freeDiscount'],
                {
                  discount: (
                    <strong className={clsx(isPro && 'text-greenHighlight')}>
                      {readableDiscount}
                    </strong>
                  ),
                  exevopro: (
                    <strong className="rare-gradient-text">Exevo Pro</strong>
                  ),
                },
              )}
            </p>
          }
          checked={isPro}
          disabled
        />
      </NextLink>

      <S.Group>
        <S.Small>{advertise.Discount.description}</S.Small>
        <div className="flex items-center gap-1.5">
          <S.Strong>{readableOffer}</S.Strong>{' '}
          <S.Striked className={noDiscount ? 'opacity-0' : 'opacity-100'}>
            {readableOriginalPrice}
          </S.Striked>{' '}
          <S.DiscountTag className={noDiscount ? 'opacity-0' : 'opacity-100'}>
            -{offPercentage}
          </S.DiscountTag>
        </div>
      </S.Group>

      <S.Group>
        <S.Small>Tier {discountTier}</S.Small>
        <S.Bar>
          <S.TierSeparator data-tier={2} />
          <S.TierSeparator data-tier={3} />
          <S.Fill
            data-tier={discountTier}
            data-progress={daysCount}
            data-empty={daysCount === 0}
          />
        </S.Bar>
      </S.Group>
    </div>
  )
}

export default Discount
