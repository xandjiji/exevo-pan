import { Table } from 'components/Atoms'
import * as S from './styles'
import { CharacterTableProps } from './types'

const CharacterTable = ({
  characterList,
  ...props
}: CharacterTableProps): JSX.Element => (
  <S.Table {...props}>
    <Table.Head>
      <Table.Row>
        <Table.HeadColumn>#</Table.HeadColumn>
        <Table.HeadColumn>Nickname</Table.HeadColumn>
        <Table.HeadColumn>Kills</Table.HeadColumn>
        <Table.HeadColumn>Deaths</Table.HeadColumn>
      </Table.Row>
    </Table.Head>

    <Table.Body>
      {characterList.map((member, index) => (
        <Table.Row key={member.nickname}>
          <Table.Column>{index + 1}</Table.Column>
          <S.CharacterColumn>
            <a
              href={`https://www.tibia.com/community/?name=${encodeURIComponent(
                member.nickname,
              )}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {member.nickname}
            </a>
            <S.CharacterInfo>{`Level ${member.level} - ${member.vocation}`}</S.CharacterInfo>
          </S.CharacterColumn>
          <Table.Column>{member.kills}</Table.Column>
          <Table.Column>{member.deathCount}</Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </S.Table>
)

export default CharacterTable
