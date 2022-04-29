/* eslint-disable jsx-a11y/heading-has-content */
import styled, { css } from 'styled-components'
import clsx from 'clsx'
import MagicSvg from 'assets/svgs/magic.svg'
import CharmSvg from 'assets/svgs/charms.svg'
import BookSvg from 'assets/svgs/book.svg'
import PeopleSvg from 'assets/svgs/people.svg'
import StarSvg from 'assets/svgs/star.svg'

const iconStyle = css`
  margin-right: 4px;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  transform: translateY(-1px);
  fill: var(--onSurface);
`

export const TitleWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['h5']) => (
  <h5
    className={clsx(
      'text-tsm flex flex-nowrap items-center font-normal',
      className,
    )}
    {...props}
  />
)

export const Icons = {
  Imbuement: styled(MagicSvg)`
    ${iconStyle}
  `,
  Charm: styled(CharmSvg)`
    ${iconStyle}
  `,
  Quest: styled(BookSvg)`
    ${iconStyle}
  `,
  Hireling: styled(PeopleSvg)`
    ${iconStyle}
  `,
  Achievements: styled(StarSvg)`
    ${iconStyle}
  `,
}
