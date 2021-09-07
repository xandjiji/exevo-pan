import { Table } from 'components/Atoms'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import * as S from './styles'
import { CharacterTableProps } from './types'

const CharacterTable = ({
  characterList,
  ...props
}: CharacterTableProps): JSX.Element => (
  <S.Table {...props}>
    <Table.Element>
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
            <CharacterInfoColumn
              nickname={member.nickname}
              level={member.level}
              vocation={member.vocation}
            />
            <Table.Column title="Total kills">{member.kills}</Table.Column>
            <Table.Column title="Total death count">
              {member.deathCount}
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Element>
  </S.Table>
)

export default CharacterTable
