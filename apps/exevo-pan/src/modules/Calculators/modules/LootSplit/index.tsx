import { useState } from 'react'
import { Main } from '../../components'
import { parse } from './utils'
import { defaultValue } from './defaultValue'

/* @ ToDo:
- get transfers
*/

const LootSplit = () => {
  const [rawSession, setRawSession] = useState(defaultValue)

  console.log('team', parse.TeamReceipt(rawSession))
  console.log('players', parse.PlayerReceipts(rawSession))

  return (
    <Main>
      <textarea
        value={rawSession}
        onChange={(e) => setRawSession(e.target.value)}
      />
    </Main>
  )
}

export default LootSplit
