import { screen } from '@testing-library/react'
import { useRouter, NextRouter } from 'next/router'
import { renderWithProviders } from 'utils/test'
import Link from '..'

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe('<Link />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('for exact = FALSE', () => {
    test('aria-current should be set if href matches pathname (exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepage',
      } as NextRouter)

      renderWithProviders(
        <Link href="/homepage">
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('none')).toHaveAttribute('aria-current', 'page')
    })

    test('aria-current should NOT be set if href does NOT matches pathname', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/about',
      } as NextRouter)

      renderWithProviders(
        <Link href="/homepage">
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('none')).not.toHaveAttribute(
        'aria-current',
        'page',
      )
    })

    test('aria-current should be set if href matches pathname (not exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepages',
      } as NextRouter)

      renderWithProviders(
        <Link href="/homepage">
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('none')).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('for exact = TRUE', () => {
    test('aria-current should be set if href matches pathname (exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepage',
      } as NextRouter)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('none')).toHaveAttribute('aria-current', 'page')
    })

    test('aria-current should NOT be set if href does NOT matches pathname', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/about',
      } as NextRouter)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('none')).not.toHaveAttribute(
        'aria-current',
        'page',
      )
    })

    test('aria-current should NOT be set if href does NOT matches pathname (not exact)', () => {
      mockedUseRouter.mockReturnValueOnce({
        pathname: '/homepages',
      } as NextRouter)

      renderWithProviders(
        <Link href="/homepage" exact>
          <div role="none">homepage</div>
        </Link>,
      )

      expect(screen.getByRole('none')).not.toHaveAttribute(
        'aria-current',
        'page',
      )
    })
  })
})
