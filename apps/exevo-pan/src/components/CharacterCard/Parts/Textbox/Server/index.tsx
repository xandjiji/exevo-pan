import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { loadRawSrc } from 'utils'
import TransferIcon from './TransferIcon'
import { LabeledTextBox } from '../../atoms'
import { ServerInfoProps } from './types'

const brFlag = loadRawSrc('/assets/br-flag.png')
const naFlag = loadRawSrc('/assets/na-flag.png')
const euFlag = loadRawSrc('/assets/eu-flag.png')

export const flags = [euFlag, naFlag, brFlag]

const Server = ({
  serverData,
  transfer,
  nickname,
  placement,
}: ServerInfoProps) => {
  const { common } = useTranslations()

  const [fallbackFlag] = flags

  return (
    <LabeledTextBox
      labelText="Server"
      warning={serverData.experimental}
      title={
        serverData.experimental
          ? common.CharacterCard.experimentalServer
          : undefined
      }
    >
      <img
        alt={serverData.serverLocation.string}
        title={serverData.serverLocation.string}
        src={flags[serverData.serverLocation.type] ?? fallbackFlag}
        width={16}
        height={10}
        className="pixelated shadow-sm"
      />
      <span className="text-s mr-auto">{serverData.serverName}</span>
      <TransferIcon
        transfer={transfer}
        nickname={nickname}
        placement={placement}
      />
    </LabeledTextBox>
  )
}

export default memo(Server)
