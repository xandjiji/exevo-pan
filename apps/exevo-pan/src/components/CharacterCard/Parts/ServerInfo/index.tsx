import { useTranslations } from 'contexts/useTranslation'
import { LabeledTextBox } from 'components/CharacterCard/styles'
import TransferIcon from './TransferIcon'
import * as S from './styles'

interface ServerInfoProps {
  serverData: ServerObject
  transfer: boolean
  nickname: string
}

const ServerInfo = ({
  serverData,
  transfer,
  nickname,
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
      <TransferIcon transfer={transfer} nickname={nickname} />
    </LabeledTextBox>
  )
}

export default ServerInfo
