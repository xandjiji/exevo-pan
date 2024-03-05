import { QrCodePix } from 'qrcode-pix'
import { advertising } from 'Constants'

export const generateQrCode = async (name: string): Promise<PixObject> => {
  const timestamp = Math.round(+new Date() / 1000).toString()
  const tx = QrCodePix({
    version: '01',
    key: advertising.PIX_KEY,
    name: timestamp,
    city: timestamp,
    message: name,
    transactionId: timestamp,
    value: 45,
  })

  return {
    payload: tx.payload(),
    qrCode: await tx.base64(),
  }
}
