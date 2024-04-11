import { Kysely, MysqlDialect } from 'kysely'
import { createPool } from 'mysql2'
import { DB } from './types'

const dialect = new MysqlDialect({
  pool: createPool({ uri: process.env.DATABASE_URL, connectionLimit: 30 }),
})

export const db = new Kysely<DB>({ dialect })
