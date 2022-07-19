/* eslint-disable no-shadow */
import { useState, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { Tabs, TextArea, Text, Button, CopyButton } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { InfoTooltip } from 'components/Organisms'
import clipboardSrc from 'assets/clipboard.png'
import AddIcon from 'assets/svgs/addPost.svg'
import DataIcon from 'assets/svgs/receipt.svg'
import RemoveIcon from 'assets/svgs/trash.svg'
import ChevronRight from 'assets/svgs/chevronRight.svg'
import { Main, LabeledCard, Group, Chip, ChipWrapper } from '../../components'
import SessionDialog from './SessionDialog'
import useHistory from './useHistory'
import useDisplayTimestamp from './useDisplayTimestamp'
import useSessionClipboard from './useSessionClipboard'
import TransferTable from './TransferTable'
import { parse, findTransactionsRequired } from './utils'
import { defaultValue } from './defaultValue'
import { HistoryEntry } from './types'

/* @ ToDo:
- placeholder
- none display

- advanced
    extra expenses (tibiapal)
    remove players (tibiapal)
*/

const LootSplit = () => {
  const {
    translations: { common },
  } = useTranslations()

  const [isHistory, setIsHistory] = useState(false)
  const { list, selected, action } = useHistory()

  const [rawNewSession, setRawNewSession] = useState(defaultValue)
  const [dialogData, setDialogData] = useState<string>('')

  const historySelected = isHistory && selected
  const displayedSession = historySelected
    ? (selected as HistoryEntry).rawData
    : rawNewSession

  const displayTimestamp = useDisplayTimestamp()

  const { timestamp, teamReceipt, playerReceipts, transactions } =
    useMemo(() => {
      try {
        const teamReceipt = parse.TeamReceipt(displayedSession)
        const playerReceipts = parse.PlayerReceipts(displayedSession)
        const transactions = findTransactionsRequired(playerReceipts)
        const timestamp = parse.SessionTimestamp(displayedSession)

        return { teamReceipt, playerReceipts, transactions, timestamp }
      } catch {
        return {}
      }
    }, [displayedSession])

  const isInvalid = !!rawNewSession && !transactions
  const shouldDisplaySessionClipboard = historySelected || !isInvalid
  const isWaste = teamReceipt && teamReceipt.balance < 0

  const copyText = useSessionClipboard({
    timestamp,
    teamReceipt,
    playerReceipts,
    transactions,
  })

  return (
    <Main>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Tabs.Group
            onChange={useCallback(
              (tabIndex) => setIsHistory(tabIndex === 1),
              [],
            )}
          >
            <Tabs.Panel label="New session">
              <TextArea
                label={
                  <InfoTooltip.LabelWrapper>
                    Paste your party hunt session
                    <InfoTooltip
                      labelSize
                      content={
                        <Image
                          src={clipboardSrc}
                          alt="Party Hunt session analyser"
                          unoptimized
                        />
                      }
                    />
                  </InfoTooltip.LabelWrapper>
                }
                aria-label="Paste your party hunt session"
                onChange={(e) => setRawNewSession(e.target.value)}
                value={rawNewSession}
                error={isInvalid}
                className="h-64"
                noResize
                noAlert
              />
            </Tabs.Panel>
            <Tabs.Panel label={`History (${list.length})`}>
              <div className="custom-scrollbar -mt-1 grid max-h-64 overflow-auto pr-2">
                {list.map(({ key, timestamp }) => {
                  const isSelected = key === selected?.key

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => action.select(key)}
                      className={clsx(
                        'border-separator/30 text-tsm hover:text-primaryHighlight group flex cursor-pointer items-center justify-between border-0 border-solid px-4 py-2 transition-colors',
                        isSelected ? 'text-primaryHighlight' : 'text-onSurface',
                      )}
                      style={{ borderBottomWidth: 1 }}
                    >
                      {displayTimestamp(timestamp)}
                      <ChevronRight
                        className={clsx(
                          'fill-onSurface relative left-0 transition-all group-hover:left-1',
                          isSelected ? 'left-1' : 'left-0',
                        )}
                      />
                    </button>
                  )
                })}
                {list.length === 0 && (
                  <EmptyState
                    text={{ content: 'No sessions', size: 24 }}
                    className="mx-auto mt-4 w-24"
                  />
                )}
              </div>
            </Tabs.Panel>
          </Tabs.Group>
        </div>

        <LabeledCard labelText="Transfers" className="max-w-[300px]">
          {shouldDisplaySessionClipboard && (
            <CopyButton
              copyString={copyText}
              className="absolute top-4 right-6"
            />
          )}
          <Group>
            <InfoTooltip.LabelWrapper className="font-bold">
              Team session{' '}
              <InfoTooltip
                labelSize
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
            </InfoTooltip.LabelWrapper>
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
                      teamReceipt?.balance ?? 0 / (playerReceipts ?? []).length,
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

          <div className="mt-4 flex justify-end gap-2">
            {historySelected && (
              <>
                <Button
                  type="button"
                  onClick={
                    selected ? () => action.remove(selected?.key) : undefined
                  }
                  pill
                  hollow
                >
                  <RemoveIcon className="-ml-1 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    setDialogData((selected as HistoryEntry).rawData)
                  }
                  pill
                  disabled={isInvalid}
                >
                  <DataIcon className={clsx('-ml-1 h-4 w-4')} />
                  Raw data
                </Button>
              </>
            )}

            {!historySelected && (
              <Button
                type="button"
                onClick={() => action.add(rawNewSession)}
                pill
                disabled={isInvalid}
              >
                <AddIcon className={clsx('-ml-1 h-4 w-4')} />
                Save
              </Button>
            )}
          </div>
        </LabeledCard>
      </div>

      <SessionDialog
        sessionData={dialogData}
        onClose={() => setDialogData('')}
      />
    </Main>
  )
}

export default LootSplit
