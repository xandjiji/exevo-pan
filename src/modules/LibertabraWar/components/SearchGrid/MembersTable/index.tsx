import { useState, useCallback, useMemo } from 'react'
import { Table, Paginator } from 'components/Atoms'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import * as S from './styles'
import { MembersTableProps } from './types'

const MembersTable = ({
  pageSize = 10,
  memberList,
  ...props
}: MembersTableProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const onPageChange = useCallback(
    (newPage: number) => setCurrentPage(newPage),
    [],
  )

  const currentListPage = useMemo(
    () =>
      memberList.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [pageSize, memberList, currentPage],
  )

  return (
    <S.Table {...props}>
      <S.ControlHeader>
        <Paginator
          aria-controls="members-grid"
          pageSize={pageSize}
          totalItems={memberList.length}
          currentPage={currentPage}
          onChange={onPageChange}
          noItemsMessage="No characters found"
        />
      </S.ControlHeader>
      <Table.Element id="members-grid">
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn>Nickname</Table.HeadColumn>
            <Table.HeadColumn>Guild</Table.HeadColumn>
            <Table.HeadColumn>Kills</Table.HeadColumn>
            <Table.HeadColumn>Deaths</Table.HeadColumn>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {currentListPage.map((member) => (
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
      </Table.Element>
    </S.Table>
  )
}

export default MembersTable
