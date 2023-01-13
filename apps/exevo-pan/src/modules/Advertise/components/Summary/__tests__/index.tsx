import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset } from 'utils/test'
import { calculatePrice, readablePrice } from '../../../utils'
import Summary from '..'
import { SummaryProps } from '../types'

const [randomCharacter] = randomDataset().characterData

const props: SummaryProps = {
  isPro: false,
  selectedCharacter: randomCharacter,
  paymentMethod: 'PIX',
  selectedDates: ['10/21/2021', '10/22/2021'],
}

const DAYS_COUNT = props.selectedDates.length

describe('<Summary />', () => {
  test('should display auction config data', () => {
    renderWithProviders(<Summary {...props} />)

    expect(
      screen.getByText(props.selectedCharacter?.nickname ?? ''),
    ).toBeInTheDocument()

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute(
      'href',
      `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${props.selectedCharacter?.id}`,
    )
    expect(linkElement).toHaveTextContent(`(#${props.selectedCharacter?.id})`)

    expect(screen.getByText('2')).toBeInTheDocument()
    const daysElement = screen.getByText('days')
    expect(daysElement).toBeInTheDocument()

    userEvent.hover(daysElement)
    expect(screen.getByText('21/10/2021')).toBeVisible()
    expect(screen.getByText('22/10/2021')).toBeVisible()

    expect(
      screen.getByText(
        readablePrice.full.PIX(
          calculatePrice({
            days: DAYS_COUNT,
            paymentMethod: props.paymentMethod,
            isPro: props.isPro,
          }).totalPrice,
        ),
      ),
    ).toBeInTheDocument()
  })
})
