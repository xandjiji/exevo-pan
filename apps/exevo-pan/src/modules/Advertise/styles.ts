import styled, { css } from 'styled-components'
import { Stepper as BaseStepper } from 'components/Atoms'
import { CustomScrollbar, InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.main`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  max-height: calc(100% - 60px);
  overflow: auto;
  ${CustomScrollbar}

  background-color: var(--background);
  ${Smooth}

  &::before {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 72px;
    background-image: linear-gradient(
      to top,
      var(--background),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
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
