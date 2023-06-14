import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useMemo } from 'react'
import { Table, Input, Paginator, Chip } from 'components/Atoms'
import Image from 'next/image'
import knightSrc from 'assets/knight.png'
import paladinSrc from 'assets/paladin.png'
import sorcererSrc from 'assets/sorcerer.png'
import druidSrc from 'assets/druid.png'
import EmptyState from './EmptyState'
import LabelGroup from './LabelGroup'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import { MembersTableProps, SortMode } from './types'

const Emoji = (args: JSX.IntrinsicElements['span']) => (
  <span {...args} className="text-tsm mr-1 ml-[-3px]" />
)

const MembersTable = ({
  pageSize = 10,
  memberList,
  className,
  ...props
}: MembersTableProps) => {
  const { war } = useTranslations()

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
    <Table className={clsx('mx-auto mb-4 max-w-3xl', className)} {...props}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <LabelGroup
          label={war.SearchGrid.MembersTable.filters}
          className="w-full"
        >
          <div className="flex flex-wrap gap-2">
            <Chip
              overrideStatus={currentGuild === 0}
              onClick={() => toggleGuild(0)}
              className="!child:mr-1"
            >
              <Emoji
                role="img"
                aria-label={war.SearchGrid.MembersTable.goatLabel}
              >
                🐐
              </Emoji>
              Libertabra Pune
            </Chip>
            <Chip
              overrideStatus={currentGuild === 1}
              onClick={() => toggleGuild(1)}
              className="!child:mr-1"
            >
              <Emoji
                role="img"
                aria-label={war.SearchGrid.MembersTable.skullLabel}
              >
                💀
              </Emoji>
              Bones Alliance
            </Chip>
            <Chip
              overrideStatus={currentVocations.has(1)}
              onClick={() => toggleVocationSet(1)}
              className="!child:mr-1"
            >
              <Image src={knightSrc} alt="Knight" />
              Knight
            </Chip>
            <Chip
              overrideStatus={currentVocations.has(2)}
              onClick={() => toggleVocationSet(2)}
              className="!child:mr-1"
            >
              <Image src={paladinSrc} alt="Paladin" />
              Paladin
            </Chip>
            <Chip
              overrideStatus={currentVocations.has(3)}
              onClick={() => toggleVocationSet(3)}
              className="!child:mr-1"
            >
              <Image src={sorcererSrc} alt="Sorcerer" />
              Sorcerer
            </Chip>
            <Chip
              overrideStatus={currentVocations.has(4)}
              onClick={() => toggleVocationSet(4)}
              className="!child:mr-1"
            >
              <Image src={druidSrc} alt="Druid" />
              Druid
            </Chip>
          </div>
        </LabelGroup>
        <Input
          id="search-nickname-input"
          label={war.SearchGrid.MembersTable.searchLabel}
          aria-controls="members-grid"
          allowClear
          placeholder="Nickname"
          onChange={onSearchChange}
        />
        <Paginator
          aria-controls="members-grid"
          pageSize={pageSize}
          totalItems={filteredList.length}
          currentPage={currentPage}
          onChange={onPageChange}
          noItemsMessage={war.SearchGrid.MembersTable.paginatorNoItems}
          className="ml-auto"
        />
      </div>
      <Table.Element id="members-grid">
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn
              aria-label={war.SearchGrid.MembersTable.levelSortLabel}
              aria-selected={currentSortKey === 'level'}
              highlighted={currentSortKey === 'level'}
              desc={currentDesc}
              onClick={() => toggleSortMode('level')}
              className="w-full cursor-pointer px-2 text-left"
            >
              Nickname
            </Table.HeadColumn>
            <Table.HeadColumn className="min-w-[64px] px-2 text-center text-xs">
              Guild
            </Table.HeadColumn>
            <Table.HeadColumn
              aria-label={war.SearchGrid.MembersTable.killsSortLabel}
              aria-selected={currentSortKey === 'kills'}
              highlighted={currentSortKey === 'kills'}
              desc={currentDesc}
              onClick={() => toggleSortMode('kills')}
              className="min-w-[64px] px-2 text-center"
            >
              Kills
            </Table.HeadColumn>
            <Table.HeadColumn
              aria-label={war.SearchGrid.MembersTable.deathSortLabel}
              aria-selected={currentSortKey === 'deathCount'}
              highlighted={currentSortKey === 'deathCount'}
              desc={currentDesc}
              onClick={() => toggleSortMode('deathCount')}
              className="min-w-[64px] px-2 text-center"
            >
              {war.SearchGrid.MembersTable.deathsHeadColumn}
            </Table.HeadColumn>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {currentListPage.map((member) => (
            <Table.Row key={member.nickname}>
              <CharacterInfoColumn
                nickname={member.nickname}
                level={member.level}
                vocation={member.vocation}
                className="w-full px-2 text-left"
              />
              <Table.Column className="min-w-[64px] px-2 text-center text-xs">
                {member.guild}
              </Table.Column>
              <Table.Column
                title={war.SearchGrid.MembersTable.killsTitle}
                className="min-w-[64px] px-2 text-center"
              >
                {member.kills}
              </Table.Column>
              <Table.Column
                title={war.SearchGrid.MembersTable.deathsTitle}
                className="min-w-[64px] px-2 text-center"
              >
                {member.deathCount}
              </Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
      {!currentListPage.length && <EmptyState />}
    </Table>
  )
}

export default MembersTable
