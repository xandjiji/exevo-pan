import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import TransferIcon from './TransferIcon'
import { LabeledTextBox } from '../../styles'
import * as S from './styles'
import { ServerInfoProps } from './types'

const Server = ({
  serverData,
  transfer,
  nickname,
  placement,
}: ServerInfoProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [fallbackFlag] = S.flags

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
      <S.Flag
        alt={serverData.serverLocation.string}
        title={serverData.serverLocation.string}
        src={S.flags[serverData.serverLocation.type] ?? fallbackFlag}
      />
      <S.ServerName>{serverData.serverName}</S.ServerName>
      <TransferIcon
        transfer={transfer}
        nickname={nickname}
        placement={placement}
      />
    </LabeledTextBox>
  )
}

export default memo(Server)
