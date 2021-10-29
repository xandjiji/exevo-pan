/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import QRCodeText from '../QRCodeText'

describe('<QRCodeText />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: QRCodeText('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
