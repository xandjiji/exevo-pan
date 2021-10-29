/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import TxInfo from '../TxInfo'

describe('<TxInfo />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: TxInfo('123') }} />)

    expect(screen.getByText('123')).toBeInTheDocument()
  })
})
