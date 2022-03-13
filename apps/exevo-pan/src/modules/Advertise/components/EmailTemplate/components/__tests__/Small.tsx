/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import Small from '../Small'

describe('<Small />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: Small('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
