import { Table } from 'components/Atoms'
import { getTimeDiff } from './utils'
import * as S from './styles'
import { LastFragsProps } from './types'

const LastFrags = ({ fragsList, ...props }: LastFragsProps): JSX.Element => (
  <S.Table {...props}>
    <Table.Head>
      <Table.Row>
        <Table.HeadColumn>Killed</Table.HeadColumn>
        <Table.HeadColumn>Character</Table.HeadColumn>
      </Table.Row>
    </Table.Head>

    <Table.Body>
      {fragsList.map((frag) => (
        <Table.Row key={`${frag.timeStamp}-${frag.nickname}`}>
          <Table.Column>{getTimeDiff(frag.timeStamp)}</Table.Column>
          <S.CharacterColumn>
            <a
              href={`https://www.tibia.com/community/?name=${encodeURIComponent(
                frag.nickname,
              )}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {frag.nickname}
            </a>
            <S.CharacterInfo>{`Level ${frag.level} - ${frag.vocation}`}</S.CharacterInfo>
          </S.CharacterColumn>
        </Table.Row>
      ))}
    </Table.Body>
  </S.Table>
)

export default LastFrags
