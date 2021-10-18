import styled from 'styled-components'
import { Button as BaseButton } from 'components/Atoms'
import { MaterialCard, Spinner } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding-top: 0;
  border-radius: 12px;
  overflow: hidden;

  div + div {
    margin-top: 8px;
  }
`

export const Title = styled.h2`
  padding: 12px 24px;
  margin: 0 -12px 16px -12px;

  background-color: var(--primary);

  font-size: 24px;
  font-weight: 400;
  color: var(--onPrimary);
`

export const Button = styled(BaseButton)`
  margin-top: 16px;
  margin-left: auto;
  display: block;
  min-width: 150px;
  min-height: 52px;
`

export const Loading = styled(Spinner)`
  margin: 0 auto;
  background: linear-gradient(
    to right,
    var(--onPrimary) 10%,
    rgba(255, 255, 255, 0) 58%
  );

  &:before {
    background: var(--onPrimary);
  }

  &:after {
    background: var(--primary);
  }
`
