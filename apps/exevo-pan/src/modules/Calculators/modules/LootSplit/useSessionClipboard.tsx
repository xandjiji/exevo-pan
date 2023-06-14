import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas } from 'utils'
import useDisplayTimestamp from './useDisplayTimestamp'
import { HuntData } from './types'

const NEWLINE = '\n'

const useSessionClipboard = ({
  timestamp,
  teamReceipt,
  playerReceipts,
  transactions,
}: HuntData): string => {
  const { calculators } = useTranslations()

  const displayTimestamp = useDisplayTimestamp()

  return useMemo(() => {
    const isWaste = teamReceipt && teamReceipt.balance < 0

    return [
      `📅 ${calculators.LootSplit.Clipboard.teamSession}: ${displayTimestamp(
        timestamp,
      )}`,
      '',
      `👥 ${calculators.LootSplit.Clipboard.partyMembers}:`,
      ...(playerReceipts ? playerReceipts.map(({ name }) => `- ${name}`) : ''),
      '',
      `🔄 ${calculators.LootSplit.Clipboard.bankTransfers}:`,
      ...(transactions
        ? transactions.map(
            ({ from, to, amount }) =>
              `- ${from} ${
                calculators.LootSplit.Clipboard.shouldTransfer
              } ${formatNumberWithCommas(amount)} gp ${
                calculators.LootSplit.Clipboard.to
              } ${to}`,
          )
        : ''),
      '',
      `💰 ${
        calculators.LootSplit.labels.total[isWaste ? 'waste' : 'profit']
      }: ${formatNumberWithCommas(
        teamReceipt?.balance ?? 0,
      )}gp (${formatNumberWithCommas(
        Math.floor((teamReceipt?.balance ?? 0) / (playerReceipts ?? []).length),
      )} gp ${calculators.LootSplit.each})`,
    ].join(NEWLINE)
  }, [displayTimestamp, timestamp, teamReceipt, playerReceipts, transactions])
}

export default useSessionClipboard
