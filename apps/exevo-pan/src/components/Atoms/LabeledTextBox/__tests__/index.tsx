import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import LabeledTextBox from '..'

describe('<LabeledTextBox />', () => {
  test('should render with children and labelText', () => {
    renderWithProviders(
      <LabeledTextBox labelText="test label">children content</LabeledTextBox>,
    )

    expect(screen.getByText('children content')).toBeInTheDocument()
    expect(screen.getByText('test label')).toBeInTheDocument()
    expect(screen.queryByTitle('Warning!')).not.toBeInTheDocument()
  })

  test('should render with children, labelText and warning', () => {
    renderWithProviders(
      <LabeledTextBox labelText="test label" warning>
        children content
      </LabeledTextBox>,
    )

    expect(screen.getByText('children content')).toBeInTheDocument()
    expect(screen.getByText('test label')).toBeInTheDocument()
    expect(screen.getByTitle('Warning!')).toBeInTheDocument()
  })

  test('should render with NO children and NO labelText', () => {
    renderWithProviders(<LabeledTextBox warning />)

    expect(screen.queryByText('children content')).not.toBeInTheDocument()
    expect(screen.queryByText('test label')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Warning!')).not.toBeInTheDocument()
  })
})
