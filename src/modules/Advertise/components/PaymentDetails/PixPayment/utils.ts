import { QrCodePix } from 'qrcode-pix'
import { pricing } from 'Constants'

interface PixParams {
  uuid: string
  nickname: string
  email: string
  daysAmount: number
}

interface PixObject {
  payload: string
  qrCode: string
}

export const generateQrCode = async ({
  uuid,
  nickname,
  email,
  daysAmount,
}: PixParams): Promise<PixObject> => {
  const tx = QrCodePix({
    version: '01',
    key: pricing.PIX_KEY,
    name: nickname,
    city: '',
    message: email,
    transactionId: uuid,
    value: daysAmount * pricing.BRL_ADVERTISE,
  })

  return {
    payload: tx.payload(),
    qrCode: await tx.base64(),
  }
}
