import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { ErrorIcon } from 'assets/svgs'
import { ErrorStateProps } from './types'

const Section = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div className={clsx('flex-grow py-4', className)} {...props} />
)

const ErrorState = ({ title, paragraphs }: ErrorStateProps) => {
  const { common } = useTranslations()

  return (
    <main className="flex flex-grow flex-col transition-colors">
      <Section className="bg-surface flex items-end justify-center">
        <span
          className="text-primary text-[64px] font-bold"
          style={{ letterSpacing: '8px' }}
        >
          {title}
        </span>
      </Section>
      <Section className="bg-primary text-center">
        <ErrorIcon
          role="alert"
          aria-label={common.error.ErrorLabel}
          className="fill-onPrimary mb-8 h-32 w-32"
        />
        {paragraphs?.map((p) => (
          <p
            key={p}
            className="text-s text-onPrimary mb-2"
            style={{ letterSpacing: '1.5px' }}
          >
            {p}
          </p>
        ))}
      </Section>
    </main>
  )
}

export default ErrorState
