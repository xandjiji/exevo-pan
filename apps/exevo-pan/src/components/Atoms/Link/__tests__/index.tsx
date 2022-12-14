import { screen } from '@testing-library/react'
import { renderWithProviders, setup } from 'utils/test'
import Link from '..'

jest.mock('next/link', () => (props: JSX.IntrinsicElements['a']) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a {...props} />
))

const mockedUseRouter = setup.useRouter()

describe('<Link />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('for exact = FALSE', () => {
    test('aria-current should be set if href matches pathname (exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepage',
      } as any)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
    })

    test('aria-current should NOT be set if href does NOT matches pathname', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/about',
      } as any)

      renderWithProviders(
        <Link href="/homepage">
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('link')).not.toHaveAttribute(
        'aria-current',
        'page',
      )
    })

    test('aria-current should be set if href matches pathname (not exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepages',
      } as any)

      renderWithProviders(
        <Link href="/homepage">
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('for exact = TRUE', () => {
    test('aria-current should be set if href matches pathname (exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepage',
      } as any)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
    })

    test('aria-current should NOT be set if href does NOT matches pathname', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/about',
      } as any)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('link')).not.toHaveAttribute(
        'aria-current',
        'page',
      )
    })

    test('aria-current should NOT be set if href does NOT matches pathname (not exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepages',
      } as any)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('link')).not.toHaveAttribute(
        'aria-current',
        'page',
      )
    })
  })
})
