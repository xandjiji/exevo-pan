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
import { LabeledCard, Group, Chip, ChipWrapper } from '../../components'
import AdvancedOptionsDialog from './AdvancedOptionsDialog'
import SessionDialog from './SessionDialog'
import useHistory from './useHistory'
import useExtraExpenses from './useExtraExpenses'
import useDisplayTimestamp from './useDisplayTimestamp'
import useSessionClipboard from './useSessionClipboard'
import TransferTable from './TransferTable'
import { parse, findTransactionsRequired } from './utils'
import { defaultValue } from './defaultValue'
import { HistoryEntry } from './types'

/* @ ToDo:
- advanced
    extra expenses

- i18n
*/

const LootSplit = () => {
  const {
    translations: { common },
  } = useTranslations()

  const [isHistory, setIsHistory] = useState(false)
  const { list, selected, action } = useHistory()

  const [rawNewSession, setRawNewSession] = useState(defaultValue)
  const [dialogData, setDialogData] = useState<string>('')
  const [openAdvancedOptions, setOpenAdvancedOptions] = useState(false)

  const [extraExpenses, setExtraExpenses] = useExtraExpenses(rawNewSession)

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
    <main className="inner-container mx-auto flex w-full flex-col justify-center gap-6 py-14 sm:max-w-[474px] md:max-w-[unset] md:flex-row md:items-start md:pt-0">
      <Tabs.Group
        onChange={useCallback((tabIndex) => setIsHistory(tabIndex === 1), [])}
        className="shrink-0 md:w-[256px]"
      >
        <Tabs.Panel label="New session" className="flex h-64 flex-col gap-2">
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
            placeholder={defaultValue}
            onChange={(e) => setRawNewSession(e.target.value)}
            value={rawNewSession}
            error={isInvalid}
            noResize
            noAlert
            className="grow"
          />
          <Button
            type="button"
            pill
            disabled={isInvalid}
            onClick={() => setOpenAdvancedOptions(true)}
          >
            Advanced options
          </Button>
        </Tabs.Panel>
        <Tabs.Panel label={`History (${list.length})`} className="h-64">
          <div className="custom-scrollbar -mt-1 h-full overflow-auto pr-2">
            {list.map(({ key, timestamp }) => {
              const isSelected = key === selected?.key

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => action.select(key)}
                  className={clsx(
                    'border-separator/30 text-tsm hover:text-primaryHighlight group flex w-full cursor-pointer items-center justify-between border-0 border-solid px-4 py-2 transition-colors',
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
                className="mx-auto mt-4 h-fit w-24"
              />
            )}
          </div>
        </Tabs.Panel>
      </Tabs.Group>

      <LabeledCard
        labelText="Transfers"
        className="grow md:max-w-[556px] lg:max-w-[420px]"
      >
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
                    playerReceipts.map(({ name }) => <li key={name}>{name}</li>)
                  ) : (
                    <span>None</span>
                  )}
                </ul>
              }
            />
          </InfoTooltip.LabelWrapper>
          {timestamp ? (
            <span>{displayTimestamp(timestamp)}</span>
          ) : (
            <span>None</span>
          )}
        </Group>

        <Group>
          <strong>Transfers</strong>
          {transactions ? (
            <TransferTable transactions={transactions} />
          ) : (
            <span>None</span>
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
              <span>None</span>
            )}
          </ChipWrapper>
        </Group>

        <div className="mt-2 flex justify-end gap-2">
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

      <AdvancedOptionsDialog
        isOpen={openAdvancedOptions}
        playerReceipts={playerReceipts ?? []}
        extraExpenses={extraExpenses}
        setExtraExpenses={setExtraExpenses}
        onClose={() => setOpenAdvancedOptions(false)}
      />
      <SessionDialog
        sessionData={dialogData}
        onClose={() => setDialogData('')}
      />
    </main>
  )
}

export default LootSplit
