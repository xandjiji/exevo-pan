import * as T from './components'

const ThankYouCard = (): string =>
  T.Card(`
    ${T.Title('Thank you for your order!')}
    ${T.Text(
      'Please complete your purchase sending <strong>250 Tibia Coins</strong> from Eternal Oblivion to <strong>Ksu</strong>',
    )}

    ${T.Text('Please complete your order paying the following Pix code:')}
    ${T.Code(
      '00020101021126680014BR.GOV.BCB.PIX01361b1009de-3b4c-46a3-8671-bd2335712cfd0206630522520400005303986540510.005802BR590663052260066305226210050663052263044824',
    )}

    ${T.QRCodeText('or using the following QR Code:')}
    ${T.QRCode(
      'data:image/png;base64,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',
    )}
`)

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

const BuildEmailHtml = (purchaseData: AdvertisePurchase): string => `
<div style="font-family: Helvetica;">
    ${ThankYouCard()}
    ${SummaryCard()}
</div>
`

export default BuildEmailHtml
