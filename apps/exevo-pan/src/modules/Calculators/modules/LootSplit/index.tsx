/* eslint-disable no-shadow */
import { useState, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tabs, TextArea, Text } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import { Main, LabeledCard, Group, Chip, ChipWrapper } from '../../components'
import useHistory from './useHistory'
import useDisplayTimestamp from './useDisplayTimestamp'
import TransferTable from './TransferTable'
import { parse, findTransactionsRequired } from './utils'
import { defaultValue } from './defaultValue'

/* @ ToDo:
- history
    tab
    actions: save, delete
    modal: raw data disabled

- tooltip clipboard
- copy all (discord, ts)?
- placeholder
- none display

- 'show raw xp'
- extra expenses (tibiapal)
- remove players (tibiapal)
*/

const LootSplit = () => {
  const {
    translations: { common },
  } = useTranslations()

  const [rawSession, setRawSession] = useState(defaultValue)
  const { list, action } = useHistory()
  const displayTimestamp = useDisplayTimestamp()

  const { timestamp, teamReceipt, playerReceipts, transactions } =
    useMemo(() => {
      try {
        const teamReceipt = parse.TeamReceipt(rawSession)
        const playerReceipts = parse.PlayerReceipts(rawSession)
        const transactions = findTransactionsRequired(playerReceipts)
        const timestamp = parse.SessionTimestamp(rawSession)

        return { teamReceipt, playerReceipts, transactions, timestamp }
      } catch {
        return {}
      }
    }, [rawSession])

  const isInvalid = rawSession && !transactions
  const isWaste = teamReceipt && teamReceipt.balance < 0

  return (
    <Main>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Tabs.Group>
            <Tabs.Panel label="New session">
              <TextArea
                label="Paste your party hunt session"
                onChange={(e) => setRawSession(e.target.value)}
                value={rawSession}
                error={isInvalid}
                className="h-64"
              />
            </Tabs.Panel>
            <Tabs.Panel label="History">
              {list.map(({ key, timestamp }) => (
                <span key={key}>{displayTimestamp(timestamp)}</span>
              ))}
            </Tabs.Panel>
          </Tabs.Group>
        </div>

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
            {timestamp ? (
              <span>{displayTimestamp(timestamp)}</span>
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
