import { advertising } from 'Constants'
import { generateQrCode } from '../PaymentDetails/PixPayment/utils'
import * as T from './components'
import { ThankYouProps } from './types'

const ThankYouCard = async ({
  auctionId,
  selectedDates,
  paymentMethod,
  paymentCharacter,
}: ThankYouProps): Promise<string> => {
  const daysAmount = selectedDates.length

  let paymentInfo = ''
  if (paymentMethod === 'TIBIA_COINS') {
    paymentInfo = T.Text(
      `Please complete your purchase sending <strong>${
        daysAmount * advertising.TIBIA_COINS_ADVERTISE
      } Tibia Coins</strong> from ${paymentCharacter} to <strong>${
        advertising.BANK_CHARACTER
      }</strong>`,
    )
  } else {
    const qrCode = await generateQrCode({ txId: auctionId, daysAmount })
    paymentInfo = `
    ${T.Text('Please complete your order paying the following Pix code:')}
    ${T.Code(qrCode.payload)}
    ${T.QRCodeText('or using the following QR Code:')}
    ${T.QRCode(qrCode.qrCode)}
    `
  }

  return T.Card(`
      ${T.Title('Thank you for your order!')}      
      ${paymentInfo}
  `)
}

const SummaryCard = (): string =>
  T.Card(`
    ${T.Title('Summary')}

    ${T.TxInfo('Transaction ID:')}
    ${T.Code('eba132cb-25f3-419f-81bc-0c39317cacd7')}

    ${T.DetailItem('Elra Alyas')}
    ${T.DetailInfo('Auctioned character')}

    ${T.DetailItem('1 days')}
    ${T.DetailInfo('Advertising duration')}

    ${T.DetailItem('250 Tibia Coins')}
    ${T.DetailInfo('Total cost')}
`)

const BuildEmailHtml = async (
  purchaseData: AdvertisePurchase,
): Promise<string> => {
  const { selectedCharacter, selectedDates, paymentMethod, paymentCharacter } =
    purchaseData

  return `
    <div style="font-family: Helvetica;">
        ${await ThankYouCard({
          auctionId: selectedCharacter.id,
          selectedDates,
          paymentMethod,
          paymentCharacter,
        })}
        ${SummaryCard()}
    </div>
    `
}

export default BuildEmailHtml
