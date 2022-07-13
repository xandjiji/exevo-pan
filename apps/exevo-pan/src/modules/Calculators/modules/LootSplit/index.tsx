import { useState } from 'react'
import { Main } from '../../components'
import { parse, findTransactionsRequired } from './utils'
import { defaultValue } from './defaultValue'

/* @ ToDo:
- <TextArea />
    igual input
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

  /* console.log('team', parse.TeamReceipt(rawSession))
  console.log('players', parse.PlayerReceipts(rawSession)) */
  /* console.log(
    parse.PlayerReceipts(rawSession).sort((a, b) => b.balance - a.balance),
  ) */
  findTransactionsRequired(parse.PlayerReceipts(rawSession))

  return (
    <Main>
      <textarea
        onChange={(e) => {
          findTransactionsRequired(parse.PlayerReceipts(e.target.value))
        }}
      />
    </Main>
  )
}

export default LootSplit
