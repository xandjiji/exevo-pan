import { memo } from 'react'
import { Input } from 'components/Atoms'
import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

const Newsletter = (
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
  const {
    translations: { blog },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <S.Title>
        {blog.Newsletter.getOur} <strong>{blog.Newsletter.newsletter}</strong>
        <br />
        {blog.Newsletter.for}
        <S.MailboxImage
          alt="Royal mail"
          layout="fixed"
          width={64}
          height={64}
        />
      </S.Title>

      <S.FormGroup>
        <S.Label htmlFor="newsletter-email-input">Email</S.Label>
        <Input
          id="newsletter-email-input"
          placeholder={blog.Newsletter.emailPlaceholder}
          allowClear
        />
      </S.FormGroup>
      <S.Button type="button">
        {blog.Newsletter.buttonText}
        <S.LetterImage
          alt="Stamped letter"
          layout="fixed"
          width={26}
          height={15}
        />
      </S.Button>
    </S.Wrapper>
  )
}

export default memo(Newsletter)
