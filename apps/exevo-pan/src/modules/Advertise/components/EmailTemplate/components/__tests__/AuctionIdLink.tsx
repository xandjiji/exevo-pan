/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import AuctionIdLink from '../AuctionIdLink'

describe('<AuctionIdLink />', () => {
  test('should render correctly', () => {
    render(<div dangerouslySetInnerHTML={{ __html: AuctionIdLink('123') }} />)

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveTextContent('(#123)')
    expect(linkElement).toHaveAttribute(
      'href',
      'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=123',
    )
  })
})
