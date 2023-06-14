import { useTranslations } from 'contexts/useTranslation'
import { Table } from 'components/Atoms'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import { CharacterTableProps } from './types'

const CharacterTable = ({
  characterList,
  caption,
  ...props
}: CharacterTableProps) => {
  const { war } = useTranslations()

  return (
    <Table {...props}>
      <Table.Element>
        <caption>{caption}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn
              aria-label={war.Top10Grid.CharacterTable.positionLabel}
              className="w-4 text-center"
            >
              #
            </Table.HeadColumn>
            <Table.HeadColumn className="w-full px-2 text-left">
              Nickname
            </Table.HeadColumn>
            <Table.HeadColumn className="w-fit px-2 text-center">
              Kills
            </Table.HeadColumn>
            <Table.HeadColumn className="w-fit px-2 text-center">
              {war.Top10Grid.CharacterTable.deathsHeadColumn}
            </Table.HeadColumn>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {characterList.map((member, index) => (
            <Table.Row key={member.nickname}>
              <Table.Column className="w-4 text-center align-top text-xs leading-relaxed">
                {index + 1}
              </Table.Column>
              <CharacterInfoColumn
                nickname={member.nickname}
                level={member.level}
                vocation={member.vocation}
                className="w-full px-2 text-left"
              />
              <Table.Column
                title={war.Top10Grid.CharacterTable.killsTitle}
                className="w-fit px-2 text-center"
              >
                {member.kills}
              </Table.Column>
              <Table.Column
                title={war.Top10Grid.CharacterTable.deathsTitle}
                className="w-fit px-2 text-center"
              >
                {member.deathCount}
              </Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
    </Table>
  )
}

export default CharacterTable
