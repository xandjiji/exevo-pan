import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import Server from 'assets/svgs/server.svg'
import NoServer from 'assets/svgs/noserver.svg'
import { TransferIconProps } from './types'

const TransferIcon = ({ transfer, nickname, placement }: TransferIconProps) => {
  const {
    translations: { common },
  } = useTranslations()

  return transfer ? (
    <Tooltip
      className="min-w-[240px]"
      placement={placement}
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <span id={`transfer-availability-${nickname}`} className="text-tsm">
          {common.CharacterCard.transferAvailable}
        </span>
      }
    >
      <Server
        className="fill-onSurface mb-[-3px] h-4 w-4"
        aria-label={common.CharacterCard.transferAvailable}
      />
    </Tooltip>
  ) : (
    <Tooltip
      className="min-w-[240px]"
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <span id={`transfer-availability-${nickname}`} className="text-tsm">
          {common.CharacterCard.transferUnavailable}
        </span>
      }
    >
      <NoServer
        className="fill-onSurface mb-[-3px] h-4 w-4"
        aria-label={common.CharacterCard.transferUnavailable}
      />
    </Tooltip>
  )
}

export default TransferIcon
