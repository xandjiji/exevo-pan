/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import BuildEmailHtml from '..'
import { generateQrCode } from '../../PaymentDetails/PixPayment/utils'
import { calculatePrice, readablePrice } from '../../../utils'
import { mockedPixPurchaseData, mockedTCPurchaseData } from './mock'

describe('<BuildEmailHtml />', () => {
  test('should render all data correctly for PIX', async () => {
    const template = await BuildEmailHtml(mockedPixPurchaseData)
    const { payload, qrCode } = await generateQrCode({
      isPro: false,
      txId: mockedPixPurchaseData.selectedCharacter.id,
      daysAmount: mockedPixPurchaseData.selectedDates.length,
    })

    render(<div dangerouslySetInnerHTML={{ __html: template }} />)

    expect(screen.getByText(payload)).toBeInTheDocument()
    expect(screen.getByAltText('QR Code')).toHaveAttribute('src', qrCode)

    const { id, nickname } = mockedPixPurchaseData.selectedCharacter

    expect(screen.getByText(mockedPixPurchaseData.uuid)).toBeInTheDocument()
    expect(screen.getByText(nickname))

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute(
      'href',
      `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}&source=overview`,
    )
    expect(linkElement).toHaveTextContent(`(#${id})`)

    expect(screen.getByText('3 days')).toBeInTheDocument()

    expect(
      screen.getByText(
        readablePrice.full.PIX(
          calculatePrice({
            isPro: false,
            days: mockedPixPurchaseData.selectedDates.length,
            paymentMethod: 'PIX',
          }).totalPrice,
        ),
      ),
    ).toBeInTheDocument()

    mockedPixPurchaseData.selectedDates.forEach((date) => {
      expect(screen.getByText(date, { exact: false })).toBeInTheDocument()
    })
  })

  test('should render all data correctly for TIBIA_COINS and PRO status', async () => {
    const template = await BuildEmailHtml(mockedTCPurchaseData)

    render(<div dangerouslySetInnerHTML={{ __html: template }} />)

    expect(
      screen.getByText(mockedTCPurchaseData.paymentCharacter, { exact: false }),
    ).toBeInTheDocument()
    expect(screen.getByText('Ksu', { exact: false })).toBeInTheDocument()

    const { id, nickname } = mockedTCPurchaseData.selectedCharacter

    expect(screen.getByText(mockedTCPurchaseData.uuid)).toBeInTheDocument()
    expect(screen.getByText(nickname))

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute(
      'href',
      `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}&source=overview`,
    )
    expect(linkElement).toHaveTextContent(`(#${id})`)

    expect(screen.getByText('1 day')).toBeInTheDocument()

    expect(
      screen.getAllByText(
        readablePrice.full.TIBIA_COINS(
          calculatePrice({
            isPro: true,
            days: mockedTCPurchaseData.selectedDates.length,
            paymentMethod: 'TIBIA_COINS',
          }).totalPrice,
        ),
      ),
    ).toHaveLength(2)

    mockedTCPurchaseData.selectedDates.forEach((date) => {
      expect(screen.getByText(date, { exact: false })).toBeInTheDocument()
    })
  })
})
