import { useTranslations } from 'contexts/useTranslation'
import { LabeledTextBox } from 'components/Atoms'
import TransferIcon from './TransferIcon'
import * as S from './styles'

interface ServerInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  serverData: ServerObject
  transfer: boolean
  nickname: string
}

const ServerInfo = ({
  serverData,
  transfer,
  nickname,
  ...props
}: ServerInfoProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

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
      <S.Wrapper {...props}>
        <S.Flag
          alt={serverData.serverLocation.string}
          title={serverData.serverLocation.string}
          src={S.flags[serverData.serverLocation.type] ?? S.flags[0]}
        />
        <S.ServerName>{serverData.serverName}</S.ServerName>
        <TransferIcon transfer={transfer} nickname={nickname} />
      </S.Wrapper>
    </LabeledTextBox>
  )
}

export default ServerInfo
