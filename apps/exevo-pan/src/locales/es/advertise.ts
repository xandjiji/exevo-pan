// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/advertise'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Destacar Subasta Tibia',
    description:
      'Destaca tu subasta del Char Bazaar de Tibia y consigue mejores ofertas.',
  },
  StepItems: {
    Select: 'Seleccionar',
    Configure: 'Configurar',
    Checkout: 'Finalizar',
  },
  NextButton: 'Siguiente',
  AuctionSearch: {
    inputLabel: 'Buscar por nickname',
    placeholder: 'Nickname',
    inputAriaLabel: 'Buscar una subasta por nombre de personaje',
    paginatorNoItems: 'Sin subasta',
    emptyStateText: 'No se encontraron subastas',
  },
  Discount: {
    title: 'Descuentos',
    description: '¡Aprovecha nuestros descuentos progresivos!',
  },
  Checkout: {
    title: 'Sus datos',
    emailPlaceholder: 'tu@email.com',
    emailInvalidMessage: 'Email inválido',
    paymentCharacterLabel: 'Personaje que enviará las coins',
    paymentCharacterInvalidMessage: 'Personaje no existe',
    checkoutButtonLabel: 'Validar y finalizar compra',
    checkoutButton: 'Finalizar',
    success: '¡Tu compra ha sido enviada!',
  },
  PaymentDetails: {
    titleIconLabel: 'Completado con éxito',
    title: '¡Tu compra ha sido enviada!',
    emailText1: 'Se ha enviado un email a',
    emailText2:
      'que contiene los detalles de su pedido. Por favor mira en la carpeta de spam',
    emojiLabel: 'Cara sonriente',
    smallDisclaimer:
      'Si la compra no se puede completar, se reembolsará su dinero.',
    CoinsPayment: {
      instruction: 'Por favor complete su pedido enviando',
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
      durationText: 'Duración del anuncio',
      costText: 'Precio total',
      highlightedDays: 'Días destacados:',
    },
  },
  EmailTitle: 'Gracias por su pedido!',
  calendarDescription: 'Elija los días en los que desea destacar su subasta.',
})
