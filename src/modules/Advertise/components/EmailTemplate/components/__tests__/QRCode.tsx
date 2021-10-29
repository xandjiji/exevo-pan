/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import QRCode from '../QRCode'

describe('<QRCode />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: QRCode('123') }} />)

    expect(screen.getByAltText('QR Code')).toHaveAttribute('src', '123')
  })
})
