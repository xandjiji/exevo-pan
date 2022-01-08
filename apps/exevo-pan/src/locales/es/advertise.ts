export default {
  Meta: {
    title: 'Exevo Pan - Anunciar',
    description: '¡Destaque su propia subasta y obtenga ofertas más altas!',
  },
  StepItems: {
    Select: 'Seleccionar',
    Configure: 'Configurar',
    Checkout: 'Finalizar',
  },
  RangeDatePicker: {
    currentMonthLabel: 'Mes actual',
    nextMonthLabel: 'Proximo mes',
    smallDescription: 'Elija los días en los que desea destacar su subasta.',
  },
  AuctionSearch: {
    inputLabel: 'Buscar por nickname',
    placeholder: 'Nickname',
    inputAriaLabel: 'Buscar una subasta por nombre de personaje',
    paginatorNoItems: 'Sin subasta',
    emptyStateText: 'No se encontraron subastas',
  },
  Checkout: {
    title: 'Sus datos',
    emailPlaceholder: 'seu@email.com.br',
    emailInvalidMessage: 'Email inválido',
    paymentCharacterLabel: 'Personaje que enviará las coins',
    paymentCharacterInvalidMessage: 'Personaje no existe',
    checkoutButtonLabel: 'Validar y finalizar compra',
    checkoutButton: 'Finalizar',
    LabelledInput: {
      valid: 'Campo valido',
      invalid: 'Campo inválido',
      loading: 'Validando...',
    },
  },
  PaymentDetails: {
    titleIconLabel: 'Completado con éxito',
    title: '¡Tu compra ha sido enviada!',
    emailText1: 'Se ha enviado un email a',
    emailText2:
      'que contiene los detalles de su pedido. Por favor mira en la caja de spam',
    emojiLabel: 'Cara sonriente',
    smallDisclaimer:
      'Si la compra no se puede completar, se reembolsará su dinero.',
    CoinsPayment: {
      instruction: 'Por favor complete su pedido enviando',
      from: 'de',
      to: 'para',
    },
    PixPayment: {
      codeText: 'Por favor complete su compra pagando el siguiente código Pix:',
      qrText: 'o usando lo siguiente QR Code:',
    },
    TransactionIdLabel: 'ID da transacción:',
    Summary: {
      title: 'Resumen',
      auctionedCharacter: 'Personaje subastado',
      datesTooltipText: 'Su subasta se destacará durante los siguientes días:',
      day: 'día',
      days: 'dias',
      durationText: 'Duración del anuncio',
      costText: 'Costo total',
      highlightedDays: 'Días de destaque:',
    },
  },
  EmailTitle: 'Gracias por su pedido!',
}
