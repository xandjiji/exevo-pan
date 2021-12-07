import styled, { css } from 'styled-components'
import MagicSvg from 'assets/svgs/magic.svg'
import CharmSvg from 'assets/svgs/charms.svg'
import BookSvg from 'assets/svgs/book.svg'

const iconStyle = css`
  margin-right: 4px;
  width: 18px;
  height: 18px;
  transform: translateY(-1px);
  fill: var(--onSurface);
`

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 12px;
`

export const ListWrapper = styled.ul``

export const Item = styled.li<{ active: boolean }>`
  display: block;
  font-size: 12px;
  text-align: left;

  font-weight: ${({ active }) => (active ? 400 : 300)};
  color: var(--onSurface);

  opacity: ${({ active }) => (active ? 1 : 0.5)};

  &::before {
    content: '·';
    margin-right: 4px;
    font-weight: 800;
    font-weight: var(--onSurface);
  }

  &:not(:last-child) {
    margin-bottom: 2px;
  }
`

export const ImbuementIcon = styled(MagicSvg)`
  ${iconStyle}
`

export const CharmIcon = styled(CharmSvg)`
  ${iconStyle}
`

export const QuestIcon = styled(BookSvg)`
  ${iconStyle}
`
