import { Table } from 'components/Atoms'
import CharacterInfoColumn from '../../CharacterInfoColumn'
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
          <CharacterInfoColumn
            nickname={member.nickname}
            level={member.level}
            vocation={member.vocation}
          />
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
