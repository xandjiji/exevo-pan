import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { PaymentData } from '@prisma/client'

declare type AuthProviders = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>

declare module 'next-auth/jwt' {
  /* this should match `User` */
  interface JWT {
    // token attributes
    name: string
    email: string
    sub: string
    picture: string
    // extended user attributes
    id: string
    provider: string
    proStatus: boolean
    proSince?: string
    paymentData?: PaymentData
  }
}

declare module 'next-auth' {
  /* this should match `JWT` */
  interface User {
    // token attributes
    name: string
    email: string
    sub: string
    picture: string
    // extended user attributes
    id: string
    provider: string
    proStatus: boolean
    proSince?: string
    paymentData?: PaymentData
  }

  interface Session {
    user: User
  }
}
