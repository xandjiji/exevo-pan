import styled from 'styled-components'
import { Skeleton } from 'components/Atoms'
import NextSvg from 'assets/svgs/next.svg'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;

  &:not(:last-child) ::after {
    content: '';
    position: absolute;
    top: calc(100% + 4px);
    right: 8px;
    width: calc(100% - 80px);
    height: 1px;
    background-color: var(--separator);
    opacity: 0.3;
  }
`

const InfoWrapper = styled.div`
  width: 100%;
`

export const Arrow = styled(NextSvg)`
  margin-left: auto;
  width: 32px;
  fill: var(--onSurface);
  flex-shrink: 0;
`

const SkeletonItem = (): JSX.Element => (
  <Wrapper>
    <Skeleton style={{ width: 56, height: 56, flexShrink: 0 }} />
    <InfoWrapper>
      <Skeleton style={{ width: '25%', height: 12, display: 'block' }} />
      <Skeleton style={{ width: '40%', height: 8 }} />
    </InfoWrapper>
    <Arrow />
  </Wrapper>
)

export default SkeletonItem
