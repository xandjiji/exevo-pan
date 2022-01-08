/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import Title from '../Title'

describe('<Title />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: Title('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
