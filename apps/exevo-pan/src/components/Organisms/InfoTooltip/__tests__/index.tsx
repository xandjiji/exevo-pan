import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import InfoTooltip from '..'

describe('<InfoTooltip />', () => {
  test('should render all contents correctly', () => {
    renderWithProviders(<InfoTooltip content="content" labelSize />)

    expect(screen.queryByText('content')).not.toBeInTheDocument()
    userEvent.tab()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  test('should render all contents correctly with `LabelWrapper`', () => {
    renderWithProviders(
      <InfoTooltip.LabelWrapper>
        <InfoTooltip content="content" />
      </InfoTooltip.LabelWrapper>,
    )

    expect(screen.queryByText('content')).not.toBeInTheDocument()
    userEvent.tab()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
