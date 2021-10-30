/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import DetailItem from '../DetailItem'

describe('<DetailItem />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: DetailItem('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
