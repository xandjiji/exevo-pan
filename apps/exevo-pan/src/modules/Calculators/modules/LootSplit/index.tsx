import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import {
  Button,
  CopyButton,
  LabeledCard,
  Tabs,
  Text,
  TextArea,
} from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { InfoTooltip } from 'components/Organisms'
import { loadRawSrc } from 'utils'
import {
  AddPostIcon,
  ChevronRightIcon,
  ReceiptIcon,
  TrashIcon,
} from 'assets/svgs'
import { Chip, ChipWrapper, Group } from '../../components'
import AdvancedOptionsDialog from './AdvancedOptionsDialog'
import SessionDialog from './SessionDialog'
import useHistory from './useHistory'
import useExtraExpenses from './useExtraExpenses'
import useToggleSet from './useToggleSet'
import useDisplayTimestamp from './useDisplayTimestamp'
import useSessionClipboard from './useSessionClipboard'
import TransferTable from './TransferTable'
import { calculateHuntData } from './utils'
import { defaultValue } from './defaultValue'
import { HistoryEntry } from './types'

const clipboardSrc = loadRawSrc('/assets/clipboard.png')

const LootSplit = () => {
  const { calculators } = useTranslations()

  const [isHistory, setIsHistory] = useState(false)
  const { list, selected, action } = useHistory()

  const [rawNewSession, setRawNewSession] = useState(defaultValue)
  const [sessionDialogOpen, setSessionDialog] = useState(false)
  const [openAdvancedOptions, setOpenAdvancedOptions] = useState(false)

  const [extraExpenses, setExtraExpenses] = useExtraExpenses(rawNewSession)
  const [removedPlayers, toggleRemovedPlayers] = useToggleSet(rawNewSession)

  const historySelected = isHistory && selected
  const displayedSession = historySelected
    ? (selected as HistoryEntry).rawData
    : rawNewSession
  const displayedExtraExpenses = historySelected
    ? (selected as HistoryEntry).extraExpenses
    : extraExpenses
  const displayedRemovedPlayers = historySelected
    ? new Set((selected as HistoryEntry).removedPlayers)
    : removedPlayers

  const displayTimestamp = useDisplayTimestamp()

  const { timestamp, teamReceipt, playerReceipts, transactions, players } =
    calculateHuntData(
      displayedSession,
      displayedExtraExpenses,
      displayedRemovedPlayers,
    )

  const isInvalid = !!rawNewSession && !transactions
  const shouldDisplaySessionClipboard = historySelected || !isInvalid
  const isWaste = teamReceipt && teamReceipt.balance < 0

  const splittedBalance = Math.floor(
    (teamReceipt?.balance ?? 0) /
      ((playerReceipts ?? []).length - displayedRemovedPlayers.size),
  )

  const copyText = useSessionClipboard({
    timestamp,
    teamReceipt,
    playerReceipts,
    transactions,
  })

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 pt-10 sm:max-w-[474px] md:max-w-[unset] md:flex-row md:items-start md:pt-0">
      <Tabs.Group
        onChange={useCallback(
          (tabIndex: number) => setIsHistory(tabIndex === 1),
          [],
        )}
        className="shrink-0 md:w-[256px]"
      >
        <Tabs.Panel
          label={calculators.LootSplit.tabs.newSession}
          className="flex h-64 flex-col gap-2"
        >
          <TextArea
            label={
              <InfoTooltip.LabelWrapper>
                {calculators.LootSplit.labels.textArea}
                <InfoTooltip
                  labelSize
                  content={
                    <img
                      src={clipboardSrc}
                      alt={calculators.LootSplit.labels.tooltipClipboard}
                    />
                  }
                />
              </InfoTooltip.LabelWrapper>
            }
            aria-label={calculators.LootSplit.labels.textArea}
            placeholder={defaultValue}
            onChange={(e) => setRawNewSession(e.target.value)}
            value={rawNewSession}
            error={isInvalid}
            noResize
            className="grow"
          />
          <Button
            type="button"
            pill
            disabled={isInvalid}
            onClick={() => setOpenAdvancedOptions(true)}
          >
            {calculators.LootSplit.advancedOptions}
          </Button>
        </Tabs.Panel>
        <Tabs.Panel
          label={`${calculators.LootSplit.tabs.history} (${list.length})`}
          className="h-64"
        >
          <div className="custom-scrollbar -mt-1 h-full overflow-auto pr-2">
            {list.map((item) => {
              const isSelected = item.key === selected?.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => action.select(item.key)}
                  className={clsx(
                    'border-separator/30 text-tsm hover:text-primaryHighlight group flex w-full cursor-pointer items-center justify-between border-0 border-solid px-4 py-2 transition-colors',
                    isSelected ? 'text-primaryHighlight' : 'text-onSurface',
                  )}
                  style={{ borderBottomWidth: 1 }}
                >
                  {displayTimestamp(item.timestamp)}
                  <ChevronRightIcon
                    className={clsx(
                      'fill-onSurface relative left-0 h-6 w-6 transition-all group-hover:left-1',
                      isSelected ? 'left-1' : 'left-0',
                    )}
                  />
                </button>
              )
            })}
            {list.length === 0 && (
              <EmptyState
                className="mx-auto mt-4 h-fit w-24"
                variant="small"
                text={calculators.LootSplit.emptyState}
              />
            )}
          </div>
        </Tabs.Panel>
      </Tabs.Group>

      <LabeledCard
        labelText={calculators.LootSplit.labels.summary}
        className="grow md:max-w-[556px] lg:max-w-[360px]"
      >
        {shouldDisplaySessionClipboard && (
          <CopyButton
            copyString={copyText}
            className="absolute top-4 right-6"
          />
        )}
        <Group>
          <InfoTooltip.LabelWrapper className="font-bold">
            {calculators.LootSplit.labels.teamSession}{' '}
            <InfoTooltip
              labelSize
              content={
                <ul className="grid gap-1 text-left">
                  {players ? (
                    players.map((name) => <li key={name}>{name}</li>)
                  ) : (
                    <span>{calculators.none}</span>
                  )}
                </ul>
              }
            />
          </InfoTooltip.LabelWrapper>
          {timestamp ? (
            <span>{displayTimestamp(timestamp)}</span>
          ) : (
            <span>{calculators.none}</span>
          )}
        </Group>

        <Group>
          <strong>{calculators.LootSplit.labels.transfers}</strong>
          {transactions ? (
            <TransferTable transactions={transactions} />
          ) : (
            <span>{calculators.none}</span>
          )}
        </Group>

        <Group>
          <strong>
            {calculators.LootSplit.labels.total[isWaste ? 'waste' : 'profit']}
          </strong>
          <ChipWrapper>
            {teamReceipt && playerReceipts ? (
              <Chip>
                <Text.GoldCoin value={splittedBalance} displaySign={isWaste} />
                <span className="-ml-1">{calculators.LootSplit.each}</span>
              </Chip>
            ) : (
              <span>{calculators.none}</span>
            )}
          </ChipWrapper>
        </Group>

        <div className="mt-2 flex justify-end gap-4">
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
                <TrashIcon className="-ml-1 h-4 w-4" />
                {calculators.LootSplit.actions.delete}
              </Button>
              <Button
                type="button"
                onClick={() => setSessionDialog(true)}
                pill
                disabled={isInvalid}
              >
                <ReceiptIcon className="-ml-1 h-4 w-4" />
                {calculators.LootSplit.actions.data}
              </Button>
            </>
          )}

          {!historySelected && (
            <Button
              type="button"
              onClick={() =>
                action.add(rawNewSession, extraExpenses, [...removedPlayers])
              }
              pill
              disabled={isInvalid}
            >
              <AddPostIcon className="-ml-1 h-4 w-4" />
              {calculators.LootSplit.actions.save}
            </Button>
          )}
        </div>
      </LabeledCard>

      <AdvancedOptionsDialog
        isOpen={openAdvancedOptions}
        players={players ?? []}
        extraExpenses={extraExpenses}
        setExtraExpenses={setExtraExpenses}
        removedPlayers={removedPlayers}
        toggleRemovedPlayers={toggleRemovedPlayers}
        onClose={() => setOpenAdvancedOptions(false)}
      />
      <SessionDialog
        isOpen={sessionDialogOpen}
        sessionData={selected?.rawData}
        extraExpenses={selected?.extraExpenses}
        removedPlayers={new Set(selected?.removedPlayers)}
        onClose={() => setSessionDialog(false)}
      />
    </div>
  )
}

export default LootSplit
