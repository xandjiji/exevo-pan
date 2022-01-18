import { useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import styled from 'styled-components'
import { copyToClipboard } from 'utils'
import { Clickable } from 'styles'
import AnchorSvg from 'assets/svgs/anchor.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 16px;

  width: fit-content;
`

const Link = styled.a`
  flex-shrink: 0;
  display: block;
  height: 36px;
  width: 36px;

  filter: none !important;
  opacity: 0.3;

  &&::after {
    content: none;
  }
`

const AnchorIcon = styled(AnchorSvg)`
  width: 100%;
  height: 100%;
  padding: 2px;
  margin: 0;
  border-radius: 4px;
  fill: var(--onSurface);
  cursor: pointer;
  ${Clickable}
`

const Heading = styled.h2`
  flex-grow: 1;
`

const generateId = (title: string): string =>
  title
    .replaceAll(/\s/g, '-')
    .split('-')
    .map((token) => token.replace(/\W/g, ''))
    .join('-')

export const CopyToClipboard = (id: string): void =>
  copyToClipboard(
    `https://${window.location.hostname}${window.location.pathname}#${id}`,
  )

export const Section = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [anchorId] = useState(generateId(children as string))

  return (
    <Wrapper>
      <Heading {...props} id={anchorId}>
        {children}
      </Heading>
      <Link href={`#${anchorId}`} onClick={() => CopyToClipboard(anchorId)}>
        <AnchorIcon aria-label={common.AnchorIconLabel} />
      </Link>
    </Wrapper>
  )
}
