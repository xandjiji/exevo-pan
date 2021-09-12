import { useTranslation } from 'next-i18next'
import { Table } from 'components/Atoms'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import * as S from './styles'
import { CharacterTableProps } from './types'

const CharacterTable = ({
  characterList,
  caption,
  ...props
}: CharacterTableProps): JSX.Element => {
  const { t } = useTranslation('war')

  return (
    <S.Table {...props}>
      <Table.Element>
        <caption>{caption}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn>#</Table.HeadColumn>
            <Table.HeadColumn>Nickname</Table.HeadColumn>
            <Table.HeadColumn>Kills</Table.HeadColumn>
            <Table.HeadColumn>
              {t('Top10Grid.CharacterTable.deathsHeadColumn')}
            </Table.HeadColumn>
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
              <Table.Column title={t('Top10Grid.CharacterTable.killsTitle')}>
                {member.kills}
              </Table.Column>
              <Table.Column title={t('Top10Grid.CharacterTable.deathsTitle')}>
                {member.deathCount}
              </Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
    </S.Table>
  )
}

export default CharacterTable
