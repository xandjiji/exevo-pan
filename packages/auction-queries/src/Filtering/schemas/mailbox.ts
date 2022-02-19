const mailboxSet = new Set(['mailbox', 'ornate mailbox'])

const filterSkip: FilterSkip = ({ mailbox }): boolean => !mailbox

const filterTest: FilterTest =
  () =>
  ({ storeItems }): boolean =>
    storeItems.some(({ name }) => mailboxSet.has(name))

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
