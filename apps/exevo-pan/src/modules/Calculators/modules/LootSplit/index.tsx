/* eslint-disable no-shadow */
import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { TextArea, Text } from 'components/Atoms'
import { Main, LabeledCard, Group, Chip, ChipWrapper } from '../../components'
import TransferTable from './TransferTable'
import { parse, findTransactionsRequired } from './utils'
import { defaultValue } from './defaultValue'

/* @ ToDo:
- session summary
    date timestamp (session lenght)
    copy all (transactions too)?

- save session
- placeholder
- extra expenses (tibiapal)
- remove players (tibiapal)
*/

const LootSplit = () => {
  const [rawSession, setRawSession] = useState(defaultValue)

  const { teamReceipt, playerReceipts, transactions } = useMemo(() => {
    try {
      const teamReceipt = parse.TeamReceipt(rawSession)
      const playerReceipts = parse.PlayerReceipts(rawSession)
      const transactions = findTransactionsRequired(playerReceipts)

      return { teamReceipt, playerReceipts, transactions }
    } catch {
      return {
        teamReceipt: { name: '', balance: 0, loot: 0, supplies: 0 },
        playerReceipts: [],
        transactions: [],
      }
    }
  }, [rawSession])

  const isInvalid = rawSession && transactions.length === 0
  const isWaste = teamReceipt.balance < 0

  return (
    <Main>
      <div className="grid gap-6 lg:grid-cols-2">
        <TextArea
          label="Party hunt session"
          onChange={(e) => setRawSession(e.target.value)}
          value={rawSession}
          error={isInvalid}
        />

        <LabeledCard labelText="Transfers">
          <Group>
            <strong>Transfers</strong>
            <TransferTable transactions={transactions} />
          </Group>
          <Group>
            <strong>Total {isWaste ? 'waste' : 'profit'}</strong>
            <ChipWrapper>
              <Chip>
                <Text.GoldCoin
                  value={Math.floor(
                    teamReceipt.balance / playerReceipts.length,
                  )}
                  displaySign={isWaste}
                />
                <span className="-ml-1">each</span>
              </Chip>
            </ChipWrapper>
          </Group>
        </LabeledCard>
      </div>
    </Main>
  )
}

export default LootSplit
