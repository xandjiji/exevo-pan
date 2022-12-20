import { advertise, common } from 'locales'
import { advertising } from 'Constants'
import { generateQrCode } from '../PaymentDetails/PixPayment/utils'
import { calculatePrice, readablePrice } from '../../utils'
import * as T from './components'
import { EmailTemplateProps, ThankYouProps, SummaryProps } from './types'

const ThankYouCard = async ({
  isPro,
  auctionId,
  selectedDates,
  paymentMethod,
  paymentCharacter,
  locale,
}: ThankYouProps): Promise<string> => {
  const dictionary = advertise[locale as keyof typeof advertise]
  const commonDictionary = common[locale as keyof typeof common]
  const daysAmount = selectedDates.length

  let paymentInfo = ''
  if (paymentMethod === 'TIBIA_COINS') {
    paymentInfo = T.Text(
      `${dictionary.PaymentDetails.CoinsPayment.instruction} ${T.Strong(
        `${readablePrice.full.TIBIA_COINS(
          calculatePrice({ days: daysAmount, paymentMethod, isPro }).totalPrice,
        )}`,
      )} ${commonDictionary.from} ${paymentCharacter} ${
        commonDictionary.to
      } ${T.Strong(advertising.BANK_CHARACTER)}`,
    )
  } else {
    const qrCode = await generateQrCode({ txId: auctionId, daysAmount, isPro })
    paymentInfo = `
    ${T.Text(dictionary.PaymentDetails.PixPayment.codeText)}
    ${T.Code(qrCode.payload)}
    ${T.QRCodeText(dictionary.PaymentDetails.PixPayment.qrText)}
    ${T.QRCode(qrCode.qrCode)}
    `
  }

  return T.Card(`
      ${T.Title(dictionary.EmailTitle)}      
      ${paymentInfo}
      ${T.Small(dictionary.PaymentDetails.smallDisclaimer)}
  `)
}

const SummaryCard = ({
  uuid,
  isPro,
  advertisedCharacter,
  auctionId,
  selectedDates,
  paymentMethod,
  locale,
}: SummaryProps): string => {
  const dictionary = advertise[locale as keyof typeof advertise]
  const commonDictionary = common[locale as keyof typeof common]
  const daysCount = selectedDates.length

  return T.Card(`
    ${T.Title(dictionary.PaymentDetails.Summary.title)}

    ${T.TxInfo(dictionary.PaymentDetails.TransactionIdLabel)}
    ${T.Code(uuid)}

    ${T.DetailItem(
      `${advertisedCharacter} ${T.AuctionIdLink(auctionId.toString())}`,
    )}
    ${T.DetailInfo(dictionary.PaymentDetails.Summary.auctionedCharacter)}

    ${T.DetailItem(
      `${daysCount.toString()} ${
        commonDictionary[daysCount > 1 ? 'days' : 'day']
      }`,
    )}
    ${T.DetailInfo(dictionary.PaymentDetails.Summary.durationText)}

    ${T.DetailItem(
      readablePrice.full[paymentMethod](
        calculatePrice({ days: daysCount, paymentMethod, isPro }).totalPrice,
      ),
    )}
    ${T.DetailInfo(dictionary.PaymentDetails.Summary.costText)}

    ${T.Small(
      `${
        dictionary.PaymentDetails.Summary.highlightedDays
      } ${selectedDates.join(', ')}`,
    )}
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
    locale,
  } = purchaseData

  return `
    <div style="font-family: Helvetica;">
        ${await ThankYouCard({
          isPro: purchaseData.isPro,
          auctionId: selectedCharacter.id,
          selectedDates,
          paymentMethod,
          paymentCharacter,
          locale,
        })}
        ${SummaryCard({
          uuid,
          isPro: purchaseData.isPro,
          advertisedCharacter: selectedCharacter.nickname,
          auctionId: selectedCharacter.id,
          selectedDates,
          paymentMethod,
          locale,
        })}
    </div>
    `
}

export default BuildEmailHtml
