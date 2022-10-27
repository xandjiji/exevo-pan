import { FilterQuery } from 'types/FilterQuery'

const mailboxSet = ['mailbox', 'ornate mailbox']

const filterQuery: FilterQuery = {
  filterSkip: ({ mailbox }) => !mailbox,
  addQuery: () => ({ storeItems: { some: { name: { in: mailboxSet } } } }),
}

export default filterQuery
