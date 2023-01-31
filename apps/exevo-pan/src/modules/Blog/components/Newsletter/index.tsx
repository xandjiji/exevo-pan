import { memo, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { FadeImage, Input, Button } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import { useTranslations } from 'contexts/useTranslation'
import { locales } from 'Constants'
import mailboxSrc from 'assets/mailbox.png'
import letterSrc from 'assets/letter.png'

const { DEFAULT_LOCALE } = locales

const Newsletter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    translations: { common, blog },
  } = useTranslations()

  const { locale } = useRouter()

  const [email, setEmail] = useState('')
  const { mutate, status, data } = trpc.newsletter.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'success') {
        toast.success(blog.Newsletter.message.toastSuccess)
      } else {
        toast.error(common.genericError)
      }
    },
    onError: () => toast.error(common.genericError),
  })

  const registerUser = () => mutate({ email, locale: locale ?? DEFAULT_LOCALE })
  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && status !== 'loading') {
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
          width={64}
          height={64}
          unoptimized
          src={mailboxSrc}
          className="opacity-50 mix-blend-soft-light"
        />
      </div>

      {data?.message === 'success' ? (
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
              error={data ? blog.Newsletter.message[data.message] : undefined}
            />
          </div>
          <Button
            type="submit"
            loading={status === 'loading'}
            onClick={() => mutate({ email, locale: locale ?? DEFAULT_LOCALE })}
            className="lgr:text-2xl flex min-h-[52px] flex-wrap items-center justify-center gap-4 whitespace-nowrap lg:text-base"
          >
            {blog.Newsletter.buttonText}
            <FadeImage
              alt="Stamped letter"
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
