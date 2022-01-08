import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { useAuctions } from '../../../contexts/useAuctions'
import { AuctionsContextValues } from '../../../contexts/useAuctions/types'
import LoadingState from '..'

jest.mock('../../../contexts/useAuctions', () => ({
  useAuctions: jest.fn(),
}))

const mockedUseAuctions = useAuctions as jest.MockedFunction<typeof useAuctions>

const DEFAULT_VALUES = {} as AuctionsContextValues

describe('<LoadingState />', () => {
  test('useAuctions() should control the loading alert visibility', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_VALUES,
      loading: false,
    }))

    const { rerender } = renderWithProviders(
      <LoadingState>
        <div role="none" />
      </LoadingState>,
    )

    const contentElement = screen.getByRole('none')
    expect(contentElement).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_VALUES,
      loading: true,
    }))
    rerender(
      <LoadingState>
        <div role="none" />
      </LoadingState>,
    )

    const alertElement = screen.getByRole('alert')
    expect(contentElement).toBeInTheDocument()
    expect(alertElement).toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_VALUES,
      loading: false,
    }))
    rerender(
      <LoadingState>
        <div role="none" />
      </LoadingState>,
    )

    expect(contentElement).toBeInTheDocument()
    expect(alertElement).not.toBeInTheDocument()
  })
})
