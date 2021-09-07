import { Table } from 'components/Atoms'
import * as S from './styles'
import { MembersTableProps } from './types'

const MembersTable = ({
  memberList,
  ...props
}: MembersTableProps): JSX.Element => (
  <S.Table {...props}>
    <Table.Head>
      <Table.Row>
        <Table.HeadColumn>Nickname</Table.HeadColumn>
        <Table.HeadColumn>Guild</Table.HeadColumn>
        <Table.HeadColumn>Kills</Table.HeadColumn>
        <Table.HeadColumn>Deaths</Table.HeadColumn>
      </Table.Row>
    </Table.Head>

    <Table.Body>
      {memberList.map((member) => (
        <Table.Row key={member.nickname}>
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
          <Table.Column>{member.guild}</Table.Column>
          <Table.Column title="Total kills">{member.kills}</Table.Column>
          <Table.Column title="Total death count">
            {member.deathCount}
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </S.Table>
)

export default MembersTable
