import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Summary from '..'
import { mockedFormValues } from './mock'

jest.mock('../../../contexts/Form', () => ({
  useForm: () => mockedFormValues,
}))

describe('<Summary />', () => {
  test('should display auction config data', () => {
    renderWithProviders(<Summary />)

    expect(
      screen.getByText(mockedFormValues.selectedCharacter?.nickname ?? ''),
    ).toBeInTheDocument()

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute(
      'href',
      `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${mockedFormValues.selectedCharacter?.id}&source=overview`,
    )
    expect(linkElement).toHaveTextContent(
      `(#${mockedFormValues.selectedCharacter?.id})`,
    )

    expect(screen.getByText('2')).toBeInTheDocument()
    const daysElement = screen.getByText('days')
    expect(daysElement).toBeInTheDocument()

    userEvent.hover(daysElement)
    expect(screen.getByText('21/10/2021')).toBeVisible()
    expect(screen.getByText('22/10/2021')).toBeVisible()

    expect(screen.getByText('R$ 20,00 reais')).toBeInTheDocument()
  })
})
