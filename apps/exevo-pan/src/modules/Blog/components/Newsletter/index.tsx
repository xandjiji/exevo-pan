/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FadeImage, Input, Button } from 'components/Atoms'
import { useTranslations } from 'contexts/useTranslation'
import { locales } from 'Constants'
import mailboxSrc from 'assets/mailbox.png'
import letterSrc from 'assets/letter.png'
import { useNewsletter } from './useNewsletter'

const { DEFAULT_LOCALE } = locales

const Newsletter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    translations: { blog },
  } = useTranslations()

  const { locale } = useRouter()

  const [email, setEmail] = useState('')
  const { request, register } = useNewsletter()

  const registerUser = () => register(email, locale ?? DEFAULT_LOCALE)
  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && request.status !== 'LOADING') {
      registerUser()
    }
  }

  return (
    <section
      className={clsx(
        'card bg-primaryVariant relative grid gap-6 p-4',
        className,
      )}
      {...props}
    >
      <h2 className="text-txl font-light">
        {blog.Newsletter.getOur} <strong>{blog.Newsletter.newsletter}</strong>
        <br />
        {blog.Newsletter.for}
      </h2>

      <div className="absolute top-4 right-4">
        <FadeImage
          alt="Royal mail"
          layout="fixed"
          width={64}
          height={64}
          unoptimized
          src={mailboxSrc}
          className="opacity-50 mix-blend-soft-light"
        />
      </div>

      {request.status === 'SUCCESSFUL' ? (
        <span className="block text-center text-2xl">
          {blog.Newsletter.message.success} 😄
        </span>
      ) : (
        <>
          <div className="grid gap-1.5">
            <Input
              id="newsletter-email-input"
              label="Email"
              placeholder={blog.Newsletter.emailPlaceholder}
              allowClear
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyPress={onKeyPress}
              enterKeyHint="send"
              error={
                request.status === 'ERROR'
                  ? blog.Newsletter.message[request.message as string] ??
                    blog.Newsletter.message.generic
                  : undefined
              }
            />
          </div>
          <Button
            type="submit"
            loading={request.status === 'LOADING'}
            onClick={registerUser}
            className="lgr:text-2xl flex min-h-[52px] flex-wrap items-center justify-center gap-4 whitespace-nowrap lg:text-base"
          >
            {blog.Newsletter.buttonText}
            <FadeImage
              alt="Stamped letter"
              layout="fixed"
              width={26}
              height={15}
              src={letterSrc}
            />
          </Button>
        </>
      )}
    </section>
  )
}

export default memo(Newsletter)
