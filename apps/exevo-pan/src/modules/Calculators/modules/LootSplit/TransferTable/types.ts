import { Transaction } from '../types'

export type TransferTableProps = {
  transactions: Transaction<string>[]
} & JSX.IntrinsicElements['table']
