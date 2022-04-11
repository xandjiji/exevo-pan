import styled, { css } from 'styled-components'
import { Stepper as BaseStepper } from 'components/Atoms'
import { InnerContainer } from 'styles'

export const Wrapper = styled.main`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;
`

export const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 300;

  a {
    color: var(--primaryHighlight);
    font-weight: 700;
  }

  @media (min-width: 768px) {
    text-align: center;
  }
`

export const FormStepsWrapper = styled.div`
  > * {
    margin: 0 auto;
    max-width: 420px;

    &:last-child {
      margin-bottom: 48px;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    gap: 24px;
    justify-content: center;

    > * {
      margin: unset;
      height: fit-content;
      width: calc(50% - 12px);
    }
  }

  @media (min-width: 1024px) {
    gap: 60px;
  }
`

export const Stepper = styled(BaseStepper)<{ finished: boolean }>`
  padding: 0 40px;
  margin: 0 auto 54px auto;
  max-width: 420px;

  @media (min-width: 768px) {
    max-width: 560px;
  }

  ${({ finished }) =>
    finished &&
    css`
      &&& button {
        cursor: unset;
        > div {
          background-color: var(--green);
        }
      }
    `}
`
