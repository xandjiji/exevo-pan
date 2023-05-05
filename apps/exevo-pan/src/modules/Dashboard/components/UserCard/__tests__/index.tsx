import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import type { User } from 'next-auth'
import UserCard from '..'

const user: User = {
  email: '',
  id: '',
  name: 'Ksu',
  picture: 'image.png',
  proStatus: true,
  provider: 'google',
  role: 'USER',
  sub: '',
  image: 'image.png',
  proSince: '2022-12-18T12:52:10.696Z',
}

describe('<UserCard />', () => {
  test('should render a pro user correctly', () => {
    renderWithProviders(<UserCard user={user} />)

    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByAltText('Ksu')).toHaveAttribute('src', 'image.png')

    userEvent.hover(screen.getByText('Exevo Pro'))
    expect(screen.getByRole('tooltip')).toHaveTextContent(
      'Pro since: December 2022',
    )
  })

  test('should render a free user correctly', () => {
    renderWithProviders(
      <UserCard user={{ ...user, proStatus: false, proSince: undefined }} />,
    )

    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByAltText('Ksu')).toHaveAttribute('src', 'image.png')
    expect(screen.getByText('Basic')).toBeInTheDocument()
  })

  test('should display a fallback avatar', () => {
    renderWithProviders(<UserCard user={user} />)

    const imgElement = screen.getByAltText('Ksu')
    fireEvent.error(imgElement)
    expect(imgElement).not.toBeInTheDocument()
  })
})
