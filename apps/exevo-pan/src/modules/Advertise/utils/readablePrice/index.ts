export const readablePrice = {
  short: {
    TIBIA_COINS: (value: number) => `${value} TC`,
    PIX: (value: number) => `R$ ${value},00`,
  },
  full: {
    TIBIA_COINS: (value: number) => `${value} Tibia Coins`,
    PIX: (value: number) => `R$ ${value},00 reais`,
  },
} as const
