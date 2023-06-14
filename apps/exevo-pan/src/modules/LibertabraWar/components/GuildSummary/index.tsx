import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { ExternalIcon } from 'assets/svgs'
import { GuildSummaryProps } from './types'

const GuildSummary = ({
  guildName,
  href,
  displayValue,
  diffText,
  label,
  winning,
  ...props
}: GuildSummaryProps) => {
  const { war } = useTranslations()

  return (
    <div {...props}>
      <h4 className="text-onSurface relative mx-auto mb-2 w-fit text-base font-normal -tracking-wider lg:text-2xl">
        {guildName}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={href}
          className="text-none absolute top-1/2 left-full lg:left-[calc(100%+6px)]"
          style={{ transform: 'translateY(-50%)' }}
        >
          <ExternalIcon className="fill-onSurface clickable h-7 w-7 rounded p-0.5" />
          {war.GuildSummary.linkText}
        </a>
      </h4>
      <span
        className={clsx(
          'relative text-[44px] font-bold tracking-widest lg:text-[80px]',
          winning ? 'text-green' : 'text-red',
        )}
      >
        {displayValue}
        {!!diffText && (
          <span
            className="bg-primaryVariantAlert text-tsm lg:text-l text-onAlert absolute top-1/2 left-full rounded py-1 px-2 shadow-md lg:ml-4"
            style={{ transform: 'translateY(-50%)' }}
            title={`${diffText} ${war.GuildSummary.diffTitleSuffix}`}
          >
            {diffText}
          </span>
        )}
      </span>
      <span className="text-onSurface block text-xs font-light uppercase tracking-widest lg:text-base">
        {label}
      </span>
    </div>
  )
}

export default GuildSummary
