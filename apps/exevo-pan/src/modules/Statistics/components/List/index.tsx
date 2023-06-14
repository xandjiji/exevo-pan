import { useTranslations } from 'contexts/useTranslation'
import { memo, useState } from 'react'
import { useRouter } from 'next/router'
import { Table } from 'components/Atoms'
import CharacterModal from 'components/CharacterModal'
import { permalinkResolver } from 'utils'
import { ListProps } from './types'

const List = ({
  title,
  charactersList,
  pickFromCharacter,
  formatCharacterValue,
  ...props
}: ListProps) => {
  const { statistics } = useTranslations()

  const { locale } = useRouter()

  const [selectedCharacter, setSelectedCharacter] = useState<
    CharacterObject | undefined
  >()

  return (
    <>
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
            {charactersList.map((character, index) => {
              const displayedData = pickFromCharacter(character)

              return (
                <Table.Row key={character.id}>
                  <Table.Column className="w-4 text-center align-top text-xs leading-relaxed">
                    {index + 1}
                  </Table.Column>
                  <Table.Column className="w-full px-2 text-left">
                    <button
                      type="button"
                      onClick={() => setSelectedCharacter(character)}
                      className="text-primaryHighlight text-s cursor-pointer font-normal transition-all hover:opacity-70"
                    >
                      {character.nickname}
                    </button>
                  </Table.Column>
                  <Table.Column className="w-fit whitespace-nowrap text-right">
                    {formatCharacterValue
                      ? formatCharacterValue(displayedData)
                      : displayedData}
                  </Table.Column>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Element>
      </Table>

      {selectedCharacter && (
        <CharacterModal
          characterData={selectedCharacter}
          onClose={() => setSelectedCharacter(undefined)}
          permalink={permalinkResolver({
            auctionId: selectedCharacter.id,
            locale,
          })}
        />
      )}
    </>
  )
}

export default memo(List)
