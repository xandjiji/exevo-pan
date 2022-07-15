import { useState } from 'react'
import { TextArea, Input } from 'components/Atoms'
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
  const [value, setValue] = useState('INITIAL !')

  /* console.log('team', parse.TeamReceipt(rawSession))
  console.log('players', parse.PlayerReceipts(rawSession)) */
  /* console.log(
    parse.PlayerReceipts(rawSession).sort((a, b) => b.balance - a.balance),
  ) */
  findTransactionsRequired(parse.PlayerReceipts(rawSession))

  return (
    <Main>
      <TextArea
        label="(uncontrolled) Party hunt session"
        onChange={(e) => {
          console.log(e.target.value)
          findTransactionsRequired(parse.PlayerReceipts(e.target.value))
          setValue(e.target.value)
        }}
        /* onChange={(e) => {
          console.log(e.target.value)
          findTransactionsRequired(parse.PlayerReceipts(e.target.value))
        }}
        value="Text" */
        className="h-52"
      />
      <TextArea
        label="(controlled) Party hunt session"
        onChange={(e) => {
          console.log(e.target.value)
          setValue(e.target.value)
        }}
        value={value}
        className="h-52"
      />
      <TextArea
        label="(fixed) Party hunt session"
        onChange={(e) => {
          console.log(e.target.value)
          setValue(e.target.value)
        }}
        value="FIXED"
        className="h-52"
      />
      <Input label="dsadsa" disabled defaultValue="Text !! " />
      <Input label="dsadsa" value="Text !! " />
    </Main>
  )
}

export default LootSplit
