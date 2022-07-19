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
  const {
    translations: { common },
  } = useTranslations()

  const displayTimestamp = useDisplayTimestamp()

  return useMemo(() => {
    const isWaste = teamReceipt && teamReceipt.balance < 0

    return [
      `📅 Team session: ${displayTimestamp(timestamp)}`,
      '',
      '👥 Party members:',
      ...(playerReceipts ? playerReceipts.map(({ name }) => `- ${name}`) : ''),
      '',
      '🔄 Bank transfers:',
      ...(transactions
        ? transactions.map(
            ({ from, to, amount }) =>
              `- ${from} should transfer ${formatNumberWithCommas(
                amount,
              )} gp to ${to}`,
          )
        : ''),
      '',
      `💰 Total ${isWaste ? 'waste' : 'profit'}: ${formatNumberWithCommas(
        teamReceipt?.balance ?? 0,
      )}gp (${formatNumberWithCommas(
        Math.floor(teamReceipt?.balance ?? 0 / (playerReceipts ?? []).length),
      )} gp each)`,
    ].join(NEWLINE)
  }, [displayTimestamp, timestamp, teamReceipt, playerReceipts, transactions])
}

export default useSessionClipboard
