import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useMemo } from 'react'
import { Table } from 'components/Atoms'
import EmptyState from './EmptyState'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import * as S from './styles'
import { MembersTableProps, SortMode } from './types'

const MembersTable = ({
  pageSize = 10,
  memberList,
  ...props
}: MembersTableProps): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentGuild, setCurrentGuild] = useState<0 | 1 | null>(null)
  const [currentVocations, setCurrentVocations] = useState<Set<number>>(
    new Set([]),
  )

  const [sortMode, setSortMode] = useState<SortMode>({
    sortKey: 'level',
    desc: true,
  })

  const { sortKey: currentSortKey, desc: currentDesc } = sortMode

  const toggleSortMode = (sortKey: typeof sortMode.sortKey) =>
    setSortMode((prevSortMode) => {
      const { sortKey: prevSortKey, desc: prevDesc } = prevSortMode
      if (prevSortKey === sortKey) return { desc: !prevDesc, sortKey }
      return { desc: true, sortKey }
    })

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

    filteringList = filteringList.sort((a, b) => {
      const { sortKey, desc } = sortMode
      if (desc) {
        return b[sortKey] - a[sortKey]
      }
      return a[sortKey] - b[sortKey]
    })

    setCurrentPage(1)
    return filteringList
  }, [memberList, currentGuild, currentVocations, searchTerm, sortMode])

  const currentListPage = useMemo(
    () =>
      filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [pageSize, filteredList, currentPage],
  )

  return (
    <S.Table {...props}>
      <S.ControlHeader>
        <S.ToggleFiltersGroup label={war.SearchGrid.MembersTable.filters}>
          <S.FiltersChipWrapper>
            <S.Chip
              overrideStatus={currentGuild === 0}
              onClick={() => toggleGuild(0)}
            >
              <S.Emoji
                role="img"
                aria-label={war.SearchGrid.MembersTable.goatLabel}
              >
                🐐
              </S.Emoji>
              Libertabra Pune
            </S.Chip>
            <S.Chip
              overrideStatus={currentGuild === 1}
              onClick={() => toggleGuild(1)}
            >
              <S.Emoji
                role="img"
                aria-label={war.SearchGrid.MembersTable.skullLabel}
              >
                💀
              </S.Emoji>
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
          label={war.SearchGrid.MembersTable.searchLabel}
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
          noItemsMessage={war.SearchGrid.MembersTable.paginatorNoItems}
        />
      </S.ControlHeader>
      <Table.Element id="members-grid">
        <Table.Head>
          <Table.Row>
            <S.SorteableHeadColumn
              aria-label={war.SearchGrid.MembersTable.levelSortLabel}
              aria-selected={currentSortKey === 'level'}
              highlighted={currentSortKey === 'level'}
              desc={currentDesc}
              onClick={() => toggleSortMode('level')}
            >
              Nickname
            </S.SorteableHeadColumn>
            <Table.HeadColumn>Guild</Table.HeadColumn>
            <S.SorteableHeadColumn
              aria-label={war.SearchGrid.MembersTable.killsSortLabel}
              aria-selected={currentSortKey === 'kills'}
              highlighted={currentSortKey === 'kills'}
              desc={currentDesc}
              onClick={() => toggleSortMode('kills')}
            >
              Kills
            </S.SorteableHeadColumn>
            <S.SorteableHeadColumn
              aria-label={war.SearchGrid.MembersTable.deathSortLabel}
              aria-selected={currentSortKey === 'deathCount'}
              highlighted={currentSortKey === 'deathCount'}
              desc={currentDesc}
              onClick={() => toggleSortMode('deathCount')}
            >
              {war.SearchGrid.MembersTable.deathsHeadColumn}
            </S.SorteableHeadColumn>
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
              <Table.Column title={war.SearchGrid.MembersTable.killsTitle}>
                {member.kills}
              </Table.Column>
              <Table.Column title={war.SearchGrid.MembersTable.deathsTitle}>
                {member.deathCount}
              </Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
      {!currentListPage.length && <EmptyState />}
    </S.Table>
  )
}

export default MembersTable
