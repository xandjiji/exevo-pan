/* eslint-disable no-shadow */
import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { TextArea, Text } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
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
- none display
- extra expenses (tibiapal)
- remove players (tibiapal)
*/

const LootSplit = () => {
  const [rawSession, setRawSession] = useState(defaultValue)

  const { session, teamReceipt, playerReceipts, transactions } = useMemo(() => {
    try {
      const teamReceipt = parse.TeamReceipt(rawSession)
      const playerReceipts = parse.PlayerReceipts(rawSession)
      const transactions = findTransactionsRequired(playerReceipts)
      const session = parse.Session(rawSession)

      return { teamReceipt, playerReceipts, transactions, session }
    } catch {
      return {}
    }
  }, [rawSession])

  const isInvalid = rawSession && !transactions
  const isWaste = teamReceipt && teamReceipt.balance < 0

  return (
    <Main>
      <div className="grid gap-6 lg:grid-cols-2">
        <TextArea
          label="Party hunt session"
          onChange={(e) => setRawSession(e.target.value)}
          value={rawSession}
          error={isInvalid}
        />

        <LabeledCard labelText="Transfers" className="max-w-[300px]">
          <Group>
            <strong className="flex items-center gap-1 whitespace-nowrap">
              Team session{' '}
              <InfoTooltip
                className="h-3 w-3"
                content={
                  <ul className="grid gap-1 text-left">
                    {playerReceipts ? (
                      playerReceipts.map(({ name }) => (
                        <li key={name}>{name}</li>
                      ))
                    ) : (
                      <span>none</span>
                    )}
                  </ul>
                }
              />
            </strong>
            {session ? (
              <span>
                {session.from} ({session.duration})
              </span>
            ) : (
              <span>none</span>
            )}
          </Group>

          <Group>
            <strong>Transfers</strong>
            {transactions ? (
              <TransferTable transactions={transactions} />
            ) : (
              <span>none</span>
            )}
          </Group>

          <Group>
            <strong>Total {isWaste ? 'waste' : 'profit'}</strong>
            <ChipWrapper>
              {teamReceipt && playerReceipts ? (
                <Chip>
                  <Text.GoldCoin
                    value={Math.floor(
                      teamReceipt.balance / playerReceipts.length,
                    )}
                    displaySign={isWaste}
                  />
                  <span className="-ml-1">each</span>
                </Chip>
              ) : (
                <span>none</span>
              )}
            </ChipWrapper>
          </Group>
        </LabeledCard>
      </div>
    </Main>
  )
}

export default LootSplit
