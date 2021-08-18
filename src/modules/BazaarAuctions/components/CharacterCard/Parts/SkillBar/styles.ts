import styled from 'styled-components'
import { Shadow } from 'styles'
import { WrapperProps, ProgressBarProps } from './types'

export const Value = styled.div`
  padding: 3px;
  flex: none;
  width: 32px;
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: 0.6px;
  background-color: var(--primary);
  color: var(--onPrimary);
  text-align: right;
  font-weight: 600;
  transition: all 0.2s ease-out;
  transition-property: background-color, color;

  ${Shadow}
`

export const ProgressBar = styled.div<ProgressBarProps>`
  position: relative;
  height: 4px;
  width: 100%;
  background-color: var(--primaryVariant);
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.1);

  ::before {
    content: ${({ skillName }) => skillName && `'${skillName}';`};
    position: absolute;
    bottom: calc(100% + 1px);
    left: 0;

    text-transform: capitalize;
    font-size: 12px;
    font-weight: 300;
    color: var(--onSurface);
  }
`

export const BarFill = styled.div`
  display: block;
  height: 100%;
  background-color: var(--primary);
  transition: width 0.4s ease-out;
`

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: flex-end;

  ${Value} {
    margin-right: 6px;
    ${({ highlight }) => highlight && `background-color: var(--green);`}
  }

  ${ProgressBar} {
    margin-top: 1px;
  }

  ${BarFill} {
    ${({ highlight }) => highlight && `background-color: var(--green);`}
  }
`
