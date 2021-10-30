/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import Code from '../Code'

describe('<Card />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: Code('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
