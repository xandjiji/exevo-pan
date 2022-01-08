/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import DetailInfo from '../DetailInfo'

describe('<DetailInfo />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: DetailInfo('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
