/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('<Card />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: Card('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
