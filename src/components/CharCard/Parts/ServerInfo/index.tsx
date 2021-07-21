import { LabeledTextBox } from 'components/Atoms'
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
}: ServerInfoProps): JSX.Element => (
  <LabeledTextBox
    labelText="Server"
    warning={serverData.experimental}
    title={
      serverData.experimental ? 'This is an experimental server!' : undefined
    }
  >
    <S.Wrapper>
      <S.Flag
        alt={serverData.serverLocation.string}
        title={serverData.serverLocation.string}
        src={(S.flags[serverData.serverLocation.type] ?? S.flags[0]) as string}
      />
      <S.ServerName>{serverData.serverName}</S.ServerName>
      <TransferIcon transfer={transfer} nickname={nickname} />
    </S.Wrapper>
  </LabeledTextBox>
)

export default ServerInfo
