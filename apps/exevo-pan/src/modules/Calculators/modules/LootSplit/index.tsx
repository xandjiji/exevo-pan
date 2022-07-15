import { useState, useMemo } from 'react'
import { TextArea } from 'components/Atoms'
import { Main, Group } from '../../components'
import TransferTable from './TransferTable'
import { parse, findTransactionsRequired } from './utils'
import { defaultValue } from './defaultValue'

/* @ ToDo:
- display transactions
    copy to clipboard
    copy all?
- session summary

- save session
- invalid state
- extra expenses (tibiapal)
- remove players (tibiapal)
*/

const LootSplit = () => {
  const [rawSession, setRawSession] = useState(defaultValue)

  const transactions = useMemo(() => {
    try {
      return findTransactionsRequired(parse.PlayerReceipts(rawSession))
    } catch {
      return []
    }
  }, [rawSession])

  const isInvalid = rawSession && transactions.length === 0

  return (
    <Main>
      <TextArea
        label="Party hunt session"
        onChange={(e) => setRawSession(e.target.value)}
        value={rawSession}
        className="h-52"
        error={isInvalid}
      />

      <Group>
        <strong>Transfers</strong>
        <TransferTable transactions={transactions} />
      </Group>
    </Main>
  )
}

export default LootSplit
