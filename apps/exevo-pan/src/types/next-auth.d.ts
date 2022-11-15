import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { PaymentData } from '@prisma/client'

declare type AuthProviders = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    image: string
    proStatus: boolean
    proSince?: string
    paymentData?: PaymentData
  }

  interface Session {
    user: User
  }
}
