import { Kysely, MysqlDialect } from 'kysely'
import { createPool } from 'mysql2'
import type { DB } from './types'

const dialect = new MysqlDialect({
  pool: createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 30,
    timezone: 'Z',
  }),
})

export const db = new Kysely<DB>({ dialect })
