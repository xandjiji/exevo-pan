import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { PaymentData, Role } from 'db/prisma/generated/client'

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
    role: Role
    provider: BuiltInProviderType
    proStatus: boolean
    proSince?: string
    paymentData?: PaymentData | null
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
    role: Role
    provider: BuiltInProviderType
    proStatus: boolean
    proSince?: string
    paymentData?: PaymentData | null
  }

  interface Session {
    user: User
  }
}
