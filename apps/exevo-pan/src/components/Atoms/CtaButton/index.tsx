/* eslint-disable react/jsx-no-target-blank */
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { loadRawSrc } from 'utils'
import { useRouter } from 'next/router'
import { ExevoPanIcon } from 'assets/svgs'
import { useLocalizedHref } from 'hooks/useLocalizedHref'
import { routes } from 'Constants'
import { Shine } from 'components/Atoms'

const coinsGif = loadRawSrc('/assets/tibiaCoins.gif')

const CtaButton = ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => {
  const { common } = useTranslations()
  const { locale } = useRouter()
  const localizedHref = useLocalizedHref(routes.EXEVOPRO)

  const isCoins = locale === 'pt' || locale === 'es'

  return (
    <a
      href={isCoins ? common.TibiaCoinsCta.link : localizedHref}
      target="_blank"
      rel="noopener external nofollow"
      className="clickable text-tsm text-onSurface md:z-1 hover:highlight-10 animated-background relative z-10 ml-2 hidden items-end overflow-hidden whitespace-nowrap rounded-2xl py-2 pr-4 pl-10 tracking-wider shadow-md transition-all md:flex"
      {...props}
    >
      <Shine animationIterationCount="infinite" width={60} />

      {isCoins ? (
        <>
          <img
            src={coinsGif}
            alt="Tibia Coins"
            width="24"
            height="24"
            className="absolute top-1/2 left-3 h-6 w-6"
            style={{ transform: 'translateY(-50%)' }}
          />

          {common.TibiaCoinsCta.text}
        </>
      ) : (
        <>
          <ExevoPanIcon
            width={18}
            height={18}
            className="absolute top-1.5 left-[15px]"
          />
          <span>
            {templateMessage(common.exevoProCTA, {
              exevoPro: (
                <strong className="rare-gradient-text ml-[1px] tracking-wide">
                  Exevo Pro
                </strong>
              ),
            })}
          </span>
        </>
      )}
    </a>
  )
}

export default CtaButton
