import { useState } from 'react'
import { Main } from '../../components'
import { getPlayerReceipts } from './utils'
import { defaultValue } from './defaultValue'

/* @ ToDo:
- get party total
- get transfers
*/

const LootSplit = () => {
  const [sessionReceipt, setSessionReceipt] = useState(defaultValue)

  console.log(getPlayerReceipts(sessionReceipt))

  return (
    <Main>
      <textarea
        value={sessionReceipt}
        onChange={(e) => setSessionReceipt(e.target.value)}
      />
    </Main>
  )
}

export default LootSplit
