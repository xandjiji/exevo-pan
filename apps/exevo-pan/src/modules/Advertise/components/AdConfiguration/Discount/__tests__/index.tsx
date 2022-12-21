import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import {
  calculatePrice,
  getDiscountTier,
  readablePrice,
} from '../../../../utils'
import Discount from '..'

type TestCase = { daysCount: number; paymentMethod: PaymentMethods }

const days = [0, 1, 2, 3, 4, 5, 6, 7, 100]

const cases: TestCase[] = [
  ...days.map(
    (daysCount): TestCase => ({ daysCount, paymentMethod: 'TIBIA_COINS' }),
  ),
  ...days.map((daysCount): TestCase => ({ daysCount, paymentMethod: 'PIX' })),
]

describe('<Discount />', () => {
  test.each(cases)(
    'all values should be displayed correctly (FREE)',
    ({ daysCount, paymentMethod }) => {
      renderWithProviders(
        <Discount
          daysCount={daysCount}
          paymentMethod={paymentMethod}
          isPro={false}
        />,
      )

      const { offPercentage, totalPrice, saved } = calculatePrice({
        isPro: false,
        days: daysCount,
        paymentMethod,
      })

      expect(screen.getByText(/discount not applied/gi)).toBeInTheDocument()

      const tier = getDiscountTier(daysCount)

      expect(screen.getByText(`Tier ${tier}`)).toBeInTheDocument()

      const tagElement = screen.getByText(`-${offPercentage}`)
      if (saved > 0) {
        expect(
          screen.getByText(readablePrice.short[paymentMethod](totalPrice)),
        ).toBeInTheDocument()

        expect(
          screen.getByText(
            readablePrice.short[paymentMethod](saved + totalPrice),
          ),
        ).toBeInTheDocument()
        expect(tagElement).toHaveClass('opacity-100')
      } else {
        const [finalPriceElement, originalPriceElement] = screen.getAllByText(
          readablePrice.short[paymentMethod](totalPrice),
        )

        expect(finalPriceElement).not.toHaveClass('opacity-0')
        expect(originalPriceElement).toHaveClass('opacity-0')
        expect(tagElement).toHaveClass('opacity-0')
      }
    },
  )

  test.each(cases)(
    'all values should be displayed correctly (PRO)',
    ({ daysCount, paymentMethod }) => {
      renderWithProviders(
        <Discount daysCount={daysCount} paymentMethod={paymentMethod} isPro />,
      )

      const { offPercentage, totalPrice, saved } = calculatePrice({
        isPro: true,
        days: daysCount,
        paymentMethod,
      })

      expect(screen.getByText(/discount applied/gi)).toBeInTheDocument()

      const tier = getDiscountTier(daysCount)

      expect(screen.getByText(`Tier ${tier}`)).toBeInTheDocument()

      const tagElement = screen.getByText(`-${offPercentage}`)
      if (tier > 1) {
        expect(
          screen.getByText(readablePrice.short[paymentMethod](totalPrice)),
        ).toBeInTheDocument()

        expect(
          screen.getByText(
            readablePrice.short[paymentMethod](saved + totalPrice),
          ),
        ).toBeInTheDocument()
        expect(tagElement).toHaveClass('opacity-100')
      } else {
        const [finalPriceElement, possibleOriginalPriceElement] =
          screen.getAllByText(readablePrice.short[paymentMethod](totalPrice))

        const originalPriceElement =
          possibleOriginalPriceElement ??
          screen.getByText(
            readablePrice.short[paymentMethod](saved + totalPrice),
          )

        expect(finalPriceElement).not.toHaveClass('opacity-0')
        expect(originalPriceElement).toHaveClass('opacity-0')
        expect(tagElement).toHaveClass('opacity-0')
      }
    },
  )
})
