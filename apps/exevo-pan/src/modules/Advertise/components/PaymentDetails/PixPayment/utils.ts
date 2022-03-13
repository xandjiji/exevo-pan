import { QrCodePix } from 'qrcode-pix'
import { advertising } from 'Constants'
import { calculatePrice } from '../../../utils'

interface PixParams {
  txId: number
  daysAmount: number
}

export const generateQrCode = async ({
  txId,
  daysAmount,
}: PixParams): Promise<PixObject> => {
  const { totalPrice } = calculatePrice(daysAmount, 'PIX')
  const id = txId.toString()
  const tx = QrCodePix({
    version: '01',
    key: advertising.PIX_KEY,
    name: id,
    city: id,
    message: id,
    transactionId: id,
    value: totalPrice,
  })

  return {
    payload: tx.payload(),
    qrCode: await tx.base64(),
  }
}
