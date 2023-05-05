import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'

const Ul = memo(
  ({ ...props }: Omit<JSX.IntrinsicElements['ul'], 'className'>) => (
    <ul
      className="text-s ml-4 grid list-disc justify-items-start gap-1"
      {...props}
    />
  ),
)

const Li = memo(
  ({ ...props }: Omit<JSX.IntrinsicElements['li'], 'className'>) => (
    <li className="marker:text-rare text-onSurface" {...props} />
  ),
)

export default { Ul, Li }

type ListContentProps = { children: JSX.Element }

export const PremiumFiltersList = ({ children }: ListContentProps) => {
  const {
    translations: { exevopro },
  } = useTranslations()
  const i18n = exevopro

  return (
    <Tooltip
      offset={[0, 6]}
      content={
        <Ul>
          <Li>{i18n.exclusiveFilters.tcInvested}</Li>
          <Li>{i18n.exclusiveFilters.storeContent}</Li>
          <Li>{i18n.exclusiveFilters.rareItems}</Li>
          <Li>{i18n.exclusiveFilters.soulwar}</Li>
          <Li>{i18n.exclusiveFilters.primalOrdeal}</Li>
        </Ul>
      }
    >
      {children}
    </Tooltip>
  )
}

export const PremiumBossesList = ({ children }: ListContentProps) => (
  <Tooltip
    offset={[0, 6]}
    content={
      <Ul>
        <Li>The Pale Count</Li>
        <Li>Shlorg</Li>
        <Li>Man in the Cave</Li>
        <Li>Ocyakao</Li>
        <Li>The Welter</Li>
        <Li>Yeti</Li>
      </Ul>
    }
  >
    {children}
  </Tooltip>
)
