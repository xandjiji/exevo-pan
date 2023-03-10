import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import euFlag from 'assets/eu-flag.png'
import naFlag from 'assets/na-flag.png'
import brFlag from 'assets/br-flag.png'
import TransferIcon from './TransferIcon'
import { LabeledTextBox } from '../../atoms'
import { ServerInfoProps } from './types'

export const flags = [euFlag, naFlag, brFlag]

const Server = ({
  serverData,
  transfer,
  nickname,
  placement,
}: ServerInfoProps) => {
  const {
    translations: { common },
  } = useTranslations()

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
      <Image
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
