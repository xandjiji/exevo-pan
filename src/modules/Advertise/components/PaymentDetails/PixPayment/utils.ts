import { QrCodePix } from 'qrcode-pix'
import { pricing } from 'Constants'

interface PixParams {
  txId: number
  daysAmount: number
}

interface PixObject {
  payload: string
  qrCode: string
}

export const generateQrCode = async ({
  txId,
  daysAmount,
}: PixParams): Promise<PixObject> => {
  const id = txId.toString()
  const tx = QrCodePix({
    version: '01',
    key: pricing.PIX_KEY,
    name: id,
    city: id,
    message: id,
    transactionId: id,
    value: daysAmount * pricing.BRL_ADVERTISE,
  })

  return {
    payload: tx.payload(),
    qrCode: await tx.base64(),
  }
}
