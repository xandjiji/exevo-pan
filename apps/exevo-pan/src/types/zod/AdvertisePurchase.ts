import { z } from 'zod'
import { CharacterObjectSchema } from './CharacterObject'

export const PaymentMethodsSchema: z.ZodType<PaymentMethods> = z.union([
  z.literal('TIBIA_COINS'),
  z.literal('PIX'),
])

export const AdvertisePurchaseSchema: z.ZodType<AdvertisePurchase> = z.object({
  isPro: z.boolean(),
  selectedCharacter: CharacterObjectSchema,
  selectedDates: z.array(z.string()),
  paymentMethod: PaymentMethodsSchema,
  email: z.string(),
  paymentCharacter: z.string(),
  locale: z.string(),
})
