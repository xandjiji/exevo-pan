const PRICE_UNIT_DIVIDER = 3

const basePrice = {
  TIBIA_COINS: 75,
  BRL: 15,
}

const unitPrice = {
  TIBIA_COINS: basePrice.TIBIA_COINS / PRICE_UNIT_DIVIDER,
  BRL: basePrice.BRL / PRICE_UNIT_DIVIDER,
}

export const advertising = {
  PRICE_UNIT_DIVIDER: 3,
  basePrice,
  unitPrice,
  PIX_KEY: '1b1009de-3b4c-46a3-8671-bd2335712cfd',
  BANK_CHARACTER: 'Ksu',
}
