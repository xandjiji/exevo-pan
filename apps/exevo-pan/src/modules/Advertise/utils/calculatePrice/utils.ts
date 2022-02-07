export const readablePrice = (
  value: number,
  paymentMethod: PaymentMethods,
): string => {
  switch (paymentMethod) {
    case 'PIX':
      return `R$ ${value},00 reais`

    case 'TIBIA_COINS':
    default:
      return `${value} Tibia Coins`
  }
}
