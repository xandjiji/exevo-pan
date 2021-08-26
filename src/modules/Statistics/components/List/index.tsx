import { useTranslation } from 'next-i18next'
import { memo } from 'react'
import * as S from './styles'
import { ListProps } from './types'

const List = ({
  title,
  charactersList,
  displayedDataKey,
  format,
  ...props
}: ListProps): JSX.Element => {
  const { t } = useTranslation('statistics')

  return (
    <S.Wrapper {...props}>
      <S.CardHead>
        Top 10
        <S.Title>{title}</S.Title>
      </S.CardHead>

      <S.Table>
        <S.Caption>{`${t('List.captionTop10')} ${title} ${t(
          'List.captionDescription',
        )}`}</S.Caption>
        <S.TableHead>
          <tr>
            <S.HeadItem aria-label={t('List.titleLabel')}>#</S.HeadItem>
            <S.HeadItem>Nickname</S.HeadItem>
            <S.HeadItem>{title}</S.HeadItem>
          </tr>
        </S.TableHead>

        <tbody>
          {charactersList.map((character, index) => (
            <tr key={character.id}>
              <S.RowItem>{index + 1}</S.RowItem>
              <S.RowItem>
                <S.Link
                  href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${character.id}&source=overview`}
                  target="_blank"
                  rel="noreferrer noopener external"
                >
                  {character.nickname}
                </S.Link>
              </S.RowItem>
              <S.RowItem>
                {format
                  ? format(character[displayedDataKey] as never)
                  : character[displayedDataKey]}
              </S.RowItem>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  )
}

export default memo(List)
