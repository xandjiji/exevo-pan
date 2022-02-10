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
    'all values should be displayed correctly',
    ({ daysCount, paymentMethod }) => {
      renderWithProviders(
        <Discount daysCount={daysCount} paymentMethod={paymentMethod} />,
      )

      const { offPercentage, totalPrice, saved } = calculatePrice(
        daysCount,
        paymentMethod,
      )
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
        expect(tagElement).toBeVisible()
      } else {
        const [finalPriceElement, originalPriceElement] = screen.getAllByText(
          readablePrice.short[paymentMethod](totalPrice),
        )

        expect(finalPriceElement).toBeVisible()
        expect(originalPriceElement).not.toBeVisible()
        expect(tagElement).not.toBeVisible()
      }
    },
  )
})
