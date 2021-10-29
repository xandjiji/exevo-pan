/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import Strong from '../Strong'

describe('<Strong />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: Strong('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
