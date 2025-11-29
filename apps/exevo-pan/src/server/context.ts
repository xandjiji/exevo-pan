import { inferAsyncReturnType } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getToken } from 'next-auth/jwt'

export const createContext = async ({ req }: CreateNextContextOptions) => {
  const token = await getToken({ req })

  return { token, cookies: req.cookies, headers: req.headers }
}

export type Context = inferAsyncReturnType<typeof createContext>
