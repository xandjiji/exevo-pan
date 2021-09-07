import { useState, useCallback, useMemo } from 'react'
import { Table } from 'components/Atoms'
import LabelGroup from './LabelGroup'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import * as S from './styles'
import { MembersTableProps, VocationId } from './types'

const MembersTable = ({
  pageSize = 10,
  memberList,
  ...props
}: MembersTableProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentGuild, setCurrentGuild] = useState<0 | 1 | null>(null)
  const [currentVocations, setCurrentVocations] = useState<Set<number>>(
    new Set([]),
  )

  const onPageChange = useCallback(
    (newPage: number) => setCurrentPage(newPage),
    [],
  )

  const toggleGuild = (newGuildId: 0 | 1) =>
    setCurrentGuild((prevGuildId) => {
      if (newGuildId === prevGuildId) return null
      return newGuildId
    })

  const toggleVocationSet = (vocationId: number) => {
    const newVocationSet = new Set([...currentVocations])
    if (newVocationSet.has(vocationId)) {
      newVocationSet.delete(vocationId)
    } else {
      newVocationSet.add(vocationId)
    }

    setCurrentVocations(newVocationSet)
  }

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchTerm(event.target.value.toLowerCase()),
    [],
  )

  const filteredList = useMemo(() => {
    let filteringList = [...memberList]

    if (currentGuild !== null) {
      filteringList = filteringList.filter(
        (member) => member.guildId === currentGuild,
      )
    }

    if (currentVocations.size) {
      filteringList = filteringList.filter((member) =>
        currentVocations.has(member.vocationId),
      )
    }

    if (searchTerm) {
      filteringList = filteringList.filter((member) =>
        member.nickname.toLowerCase().includes(searchTerm),
      )
    }

    setCurrentPage(1)
    return filteringList
  }, [memberList, currentGuild, currentVocations, searchTerm])

  const currentListPage = useMemo(
    () =>
      filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [pageSize, filteredList, currentPage],
  )

  return (
    <S.Table {...props}>
      <S.ControlHeader>
        <S.ToggleFiltersGroup label="Filters">
          <S.FiltersChipWrapper>
            <S.Chip
              overrideStatus={currentGuild === 0}
              onClick={() => toggleGuild(0)}
            >
              Libertabra Pune
            </S.Chip>
            <S.Chip
              overrideStatus={currentGuild === 1}
              onClick={() => toggleGuild(1)}
            >
              Bones Alliance
            </S.Chip>
            <S.Chip
              overrideStatus={currentVocations.has(1)}
              onClick={() => toggleVocationSet(1)}
            >
              <S.KnightIcon />
              Knight
            </S.Chip>
            <S.Chip
              overrideStatus={currentVocations.has(2)}
              onClick={() => toggleVocationSet(2)}
            >
              <S.PaladinIcon />
              Paladin
            </S.Chip>
            <S.Chip
              overrideStatus={currentVocations.has(3)}
              onClick={() => toggleVocationSet(3)}
            >
              <S.SorcererIcon />
              Sorcerer
            </S.Chip>
            <S.Chip
              overrideStatus={currentVocations.has(4)}
              onClick={() => toggleVocationSet(4)}
            >
              <S.DruidIcon />
              Druid
            </S.Chip>
          </S.FiltersChipWrapper>
        </S.ToggleFiltersGroup>
        <S.SearchGroup
          label="Search for nickname"
          htmlFor="search-nickname-input"
        >
          <S.Input
            id="search-nickname-input"
            aria-controls="members-grid"
            allowClear
            placeholder="Nickname"
            onChange={onSearchChange}
          />
        </S.SearchGroup>
        <S.Paginator
          aria-controls="members-grid"
          pageSize={pageSize}
          totalItems={filteredList.length}
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
