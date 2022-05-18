import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { Table } from 'components/Atoms'
import { ListProps } from './types'

const List = ({
  title,
  charactersList,
  displayedDataKey,
  format,
  ...props
}: ListProps) => {
  const {
    translations: { statistics },
  } = useTranslations()

  return (
    <Table {...props} title={title} subtitle="Top 10">
      <Table.Element>
        <caption>{`${statistics.List.captionTop10} ${title} ${statistics.List.captionDescription}`}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn
              aria-label={statistics.List.titleLabel}
              className="w-4 text-center"
            >
              #
            </Table.HeadColumn>
            <Table.HeadColumn className="w-full px-2 text-left">
              Nickname
            </Table.HeadColumn>
            <Table.HeadColumn
              highlighted
              desc
              className="w-fit whitespace-nowrap text-right"
            >
              {title}
            </Table.HeadColumn>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {charactersList.map((character, index) => (
            <Table.Row key={character.id}>
              <Table.Column className="w-4 text-center align-top text-xs leading-relaxed">
                {index + 1}
              </Table.Column>
              <Table.Column className="w-full px-2 text-left">
                <a
                  href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${character.id}&source=overview`}
                  target="_blank"
                  rel="noreferrer noopener external"
                >
                  {character.nickname}
                </a>
              </Table.Column>
              <Table.Column className="w-fit whitespace-nowrap text-right">
                {format
                  ? format(character[displayedDataKey] as never)
                  : character[displayedDataKey]}
              </Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
    </Table>
  )
}

export default memo(List)
