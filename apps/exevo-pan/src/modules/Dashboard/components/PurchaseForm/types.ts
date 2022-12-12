import type { PaymentData } from '@prisma/client'

export type PurchaseFormProps = Partial<
  Pick<PaymentData, 'id' | 'character' | 'confirmed'>
>
