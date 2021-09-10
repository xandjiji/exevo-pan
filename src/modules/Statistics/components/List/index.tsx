import { memo } from 'react'
import { Table } from 'components/Atoms'
import * as S from './styles'
import { ListProps } from './types'

const List = ({
  title,
  charactersList,
  displayedDataKey,
  format,
  ...props
}: ListProps): JSX.Element => (
  <S.Table {...props} title={title} subtitle="Top 10">
    <Table.Element>
      <caption>{`Top 10 ${title} players ranking`}</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeadColumn aria-label="Ranking position">#</Table.HeadColumn>
          <Table.HeadColumn>Nickname</Table.HeadColumn>
          <Table.HeadColumn>{title}</Table.HeadColumn>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {charactersList.map((character, index) => (
          <Table.Row key={character.id}>
            <Table.Column>{index + 1}</Table.Column>
            <Table.Column>
              <a
                href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${character.id}&source=overview`}
                target="_blank"
                rel="noreferrer noopener external"
              >
                {character.nickname}
              </a>
            </Table.Column>
            <Table.Column>
              {format
                ? format(character[displayedDataKey] as never)
                : character[displayedDataKey]}
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Element>
  </S.Table>
)

export default memo(List)
