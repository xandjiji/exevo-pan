import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { FormProvider } from '../../../../contexts/Form'
import AuctionItem from '..'
import { mockedRandomCharacter, vocationEnum } from './mock'

const { nickname, level, vocationId, outfitId } = mockedRandomCharacter

const mockedOnClick = jest.fn()

describe('<AuctionItem />', () => {
  beforeEach(() => {
    mockedOnClick.mockClear()
  })

  test('should trigger onClick handler', () => {
    renderWithProviders(
      <FormProvider>
        <AuctionItem
          nickname={nickname}
          level={level}
          vocationId={vocationId}
          outfitId={outfitId}
          onClick={mockedOnClick}
        />
      </FormProvider>,
    )

    userEvent.click(screen.getByRole('button'))
    expect(mockedOnClick).toBeCalledTimes(1)
  })

  test('should render all data correctly', () => {
    renderWithProviders(
      <FormProvider>
        <AuctionItem
          nickname={nickname}
          level={level}
          vocationId={vocationId}
          outfitId={outfitId}
          onClick={mockedOnClick}
        />
      </FormProvider>,
    )

    expect(screen.getByText(nickname)).toBeInTheDocument()
    expect(
      screen.getByText(`Level ${level} - ${vocationEnum[vocationId]}`),
    ).toBeInTheDocument()
  })
})
