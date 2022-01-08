/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import Text from '../Text'

describe('<Text />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: Text('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
