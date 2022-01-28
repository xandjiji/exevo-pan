import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { ErrorStateProps } from './types'

const ErrorState = ({ title, paragraphs }: ErrorStateProps): JSX.Element => {
  const {
    translations: { error },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Top>
        <S.Title>{title}</S.Title>
      </S.Top>
      <S.Bottom>
        <S.ErrorIcon role="alert" aria-label={error.ErrorLabel} />
        {paragraphs?.map((p) => (
          <S.Paragraph key={p}>{p}</S.Paragraph>
        ))}
      </S.Bottom>
    </S.Wrapper>
  )
}

export default ErrorState
