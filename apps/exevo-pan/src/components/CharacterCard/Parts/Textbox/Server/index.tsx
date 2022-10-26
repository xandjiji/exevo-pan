import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { servers } from 'data-dictionary/dist/dictionaries/servers'
import euFlag from 'assets/eu-flag.png'
import naFlag from 'assets/na-flag.png'
import brFlag from 'assets/br-flag.png'
import TransferIcon from './TransferIcon'
import { LabeledTextBox } from '../../atoms'
import { ServerInfoProps } from './types'

const { SERVER_LOCATIONS } = servers

const flags = {
  [SERVER_LOCATIONS.EUROPE]: euFlag,
  [SERVER_LOCATIONS.NORTH_AMERICA]: naFlag,
  [SERVER_LOCATIONS.SOUTH_AMERICA]: brFlag,
} as const

const Server = ({ server, transfer, nickname, placement }: ServerInfoProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const fallbackFlag = flags[SERVER_LOCATIONS.SOUTH_AMERICA]

  return (
    <LabeledTextBox
      labelText="Server"
      warning={server.experimental}
      title={
        server.experimental
          ? common.CharacterCard.experimentalServer
          : undefined
      }
    >
      <Image
        alt={server.serverLocation}
        title={server.serverLocation}
        src={flags[server.serverLocation as keyof typeof flags] ?? fallbackFlag}
        width={16}
        height={10}
        className="shadow-sm"
      />
      <span className="text-s mr-auto">{server.serverName}</span>
      <TransferIcon
        transfer={transfer}
        nickname={nickname}
        placement={placement}
      />
    </LabeledTextBox>
  )
}

export default memo(Server)
