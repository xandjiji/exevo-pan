/* eslint-disable react/no-danger */
import { render, screen } from '@testing-library/react'
import { advertising } from 'Constants'
import BuildEmailHtml from '..'
import { generateQrCode } from '../../PaymentDetails/PixPayment/utils'
import { sortAndFormatDates } from '../../Summary/utils'
import { mockedPixPurchaseData, mockedTCPurchaseData } from './mock'

const PIX_DAY_COUNT = mockedPixPurchaseData.selectedDates.length
const TC_DAY_COUNT = mockedTCPurchaseData.selectedDates.length

describe('<BuildEmailHtml />', () => {
  test('should render all data correctly for PIX', async () => {
    const template = await BuildEmailHtml(mockedPixPurchaseData)
    const { payload, qrCode } = await generateQrCode({
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
        `R$ ${PIX_DAY_COUNT * advertising.BRL_ADVERTISE},00 reais`,
      ),
    ).toBeInTheDocument()

    sortAndFormatDates(mockedPixPurchaseData.selectedDates).forEach((date) => {
      expect(screen.getByText(date, { exact: false })).toBeInTheDocument()
    })
  })

  test('should render all data correctly for TIBIA_COINS', async () => {
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
        `${TC_DAY_COUNT * advertising.TIBIA_COINS_ADVERTISE} Tibia Coins`,
      ),
    ).toHaveLength(2)

    sortAndFormatDates(mockedTCPurchaseData.selectedDates).forEach((date) => {
      expect(screen.getByText(date, { exact: false })).toBeInTheDocument()
    })
  })
})
