import { advertising } from 'Constants'
import { generateQrCode } from '../PaymentDetails/PixPayment/utils'
import { calculatePrice } from '../Summary/utils'
import * as T from './components'
import { EmailTemplateProps, ThankYouProps, SummaryProps } from './types'

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

const SummaryCard = ({
  uuid,
  advertisedCharacter,
  selectedDates,
  paymentMethod,
}: SummaryProps): string => {
  const daysCount = selectedDates.length

  return T.Card(`
    ${T.Title('Summary')}

    ${T.TxInfo('Transaction ID:')}
    ${T.Code(uuid)}

    ${T.DetailItem(advertisedCharacter)}
    ${T.DetailInfo('Auctioned character')}

    ${T.DetailItem(daysCount.toString())}
    ${T.DetailInfo('Advertising duration')}

    ${T.DetailItem(calculatePrice(daysCount, paymentMethod))}
    ${T.DetailInfo('Total cost')}
`)
}

const BuildEmailHtml = async (
  purchaseData: EmailTemplateProps,
): Promise<string> => {
  const {
    uuid,
    selectedCharacter,
    selectedDates,
    paymentMethod,
    paymentCharacter,
  } = purchaseData

  return `
    <div style="font-family: Helvetica;">
        ${await ThankYouCard({
          auctionId: selectedCharacter.id,
          selectedDates,
          paymentMethod,
          paymentCharacter,
        })}
        ${SummaryCard({
          uuid,
          advertisedCharacter: selectedCharacter.nickname,
          selectedDates,
          paymentMethod,
        })}
    </div>
    `
}

export default BuildEmailHtml
