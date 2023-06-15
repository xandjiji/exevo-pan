/* eslint-disable react/no-danger */
import { memo } from 'react'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import clsx from 'clsx'
import { Tooltip } from 'components/Organisms'
import { CheckIcon } from 'assets/svgs'
import { ExevoProLink, Text } from 'components/Atoms'
import { auctionEstimations } from 'Constants'

const Heading = ({ className, ...props }: JSX.IntrinsicElements['p']) => (
  <p
    className={clsx(
      className,
      'flex flex-wrap items-center justify-center gap-2',
    )}
    {...props}
  />
)

const TooltipUl = ({
  ...props
}: Omit<JSX.IntrinsicElements['ul'], 'className'>) => (
  <ul
    className="marker:text-rare ml-4 grid list-disc justify-items-start gap-1"
    {...props}
  />
)

export const Li = ({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['li']) => (
  <li className={clsx('flex items-center gap-1', className)} {...props}>
    <CheckIcon className="fill-greenHighlight h-6 w-6 shrink-0" />
    {children}
  </li>
)

type PitchProps = {
  proStatus: boolean
}

const Pitch = ({ proStatus }: PitchProps) => {
  const { dashboard } = useTranslations()
  const i18n = dashboard.Pitch

  return (
    <div className="grid place-items-center gap-8">
      <div className="grid place-items-center gap-2">
        <Heading>
          {proStatus ? i18n.thankYou : i18n.upgradeNow}{' '}
          <ExevoProLink className="text-2xl tracking-wide">🧙‍♂️</ExevoProLink>
        </Heading>
        <p>{proStatus ? i18n.enjoyFeatures : i18n.exclusiveFeatures}</p>
      </div>

      <div className="text-tsm grid gap-4">
        <ul className="grid gap-2">
          <Li>{i18n.features.tcInvested}</Li>
          <Li>
            {templateMessage(i18n.features.exclusiveFilters, {
              auctionFilters: (
                <Tooltip
                  offset={[0, 6]}
                  content={
                    <div className="grid place-items-start justify-items-start gap-3">
                      <TooltipUl>
                        <li>{i18n.filtersTooltip.tc}</li>
                        <li>{i18n.filtersTooltip.store}</li>
                        <li>{i18n.filtersTooltip.rareItems}</li>
                        <li>{i18n.filtersTooltip.soulwar}</li>
                        <li>{i18n.filtersTooltip.primalOrdeal}</li>
                      </TooltipUl>
                    </div>
                  }
                >
                  <strong className="underline decoration-dashed underline-offset-4">
                    {i18n.features.auctionFilters}
                  </strong>
                </Tooltip>
              ),
            })}
          </Li>
          <Li>
            {templateMessage(i18n.features.exclusiveBosses, {
              bossTracker: (
                <Tooltip
                  offset={[0, 6]}
                  content={
                    <TooltipUl>
                      <li>The Pale Count</li>
                      <li>Shlorg</li>
                      <li>Man in the Cave</li>
                      <li>Ocyakao</li>
                      <li>The Welter</li>
                      <li>Yeti</li>
                    </TooltipUl>
                  }
                >
                  <strong className="underline decoration-dashed underline-offset-4">
                    {i18n.features.bossTracker}
                  </strong>
                </Tooltip>
              ),
            })}
          </Li>
          <Li>
            {templateMessage(i18n.features.discounts, {
              auctionHighlighting: (
                <strong>{i18n.features.auctionHighlighting}</strong>
              ),
            })}
          </Li>
          <Li>
            {templateMessage(i18n.features.bidNotifications, {
              notifications: <strong>{i18n.features.notifications}</strong>,
            })}
          </Li>
          <Li>
            {templateMessage(i18n.features.privateGroups, {
              private: <strong>{i18n.features.private}</strong>,
            })}
          </Li>
          <Li>
            {templateMessage(i18n.features.estimate, {
              maxEstimation: (
                <Text.TibiaCoin value={auctionEstimations.MAX_FREE_VALUE} />
              ),
            })}
          </Li>
        </ul>
        <p className="text-right">{i18n.more}</p>
      </div>

      {!proStatus && (
        <Heading>
          {i18n.payOnce} <strong className="text-2xl">{i18n.forever} 🙌</strong>
        </Heading>
      )}
    </div>
  )
}

export default memo(Pitch)
