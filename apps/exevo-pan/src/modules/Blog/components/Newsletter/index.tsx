import { memo, useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from 'components/Atoms'
import { useTranslations } from 'contexts/useTranslation'
import { locales } from 'Constants'
import { useNewsletter } from './useNewsletter'
import * as S from './styles'

const { DEFAULT_LOCALE } = locales

const Newsletter = (
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
  const {
    translations: { blog },
  } = useTranslations()

  const { locale } = useRouter()

  const [email, setEmail] = useState('')
  const { request, register } = useNewsletter()

  const registerUser = () => register(email, locale ?? DEFAULT_LOCALE)
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { code } = event
    if (code === 'Enter' || code === 'NumpadEnter') {
      if (request.status !== 'LOADING') {
        registerUser()
      }
    }
  }

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
          unoptimized
        />
      </S.Title>

      {request.status === 'SUCCESSFUL' ? (
        <S.ThankYou>{blog.Newsletter.message.success} 😄</S.ThankYou>
      ) : (
        <>
          <S.FormGroup>
            <S.Label htmlFor="newsletter-email-input">Email</S.Label>
            <Input
              id="newsletter-email-input"
              placeholder={blog.Newsletter.emailPlaceholder}
              allowClear
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={onKeyDown}
              errorMessage={
                request.status === 'ERROR'
                  ? blog.Newsletter.message[request.message as string]
                  : undefined
              }
            />
          </S.FormGroup>
          <S.Button
            type="submit"
            loading={request.status === 'LOADING'}
            onClick={registerUser}
          >
            {blog.Newsletter.buttonText}
            <S.LetterImage
              alt="Stamped letter"
              layout="fixed"
              width={26}
              height={15}
            />
          </S.Button>
        </>
      )}
    </S.Wrapper>
  )
}

export default memo(Newsletter)
