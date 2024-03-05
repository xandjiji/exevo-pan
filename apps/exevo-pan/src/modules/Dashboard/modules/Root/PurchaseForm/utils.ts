import { QrCodePix } from 'qrcode-pix'
import { advertising } from 'Constants'

export const generateQrCode = async (name: string): Promise<PixObject> => {
  const tx = QrCodePix({
    version: '01',
    key: advertising.PIX_KEY,
    name,
    city: name,
    message: name,
    transactionId: name,
    value: 45,
  })

  return {
    payload: tx.payload(),
    qrCode: await tx.base64(),
  }
}
