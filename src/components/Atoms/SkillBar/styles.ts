import styled from 'styled-components'
import { Shadow } from 'styles'
import { WrapperProps, InfoProps } from './types'

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
  transition: background-color 0.2s ease-out;
  transition: color 0.2s ease-out;

  ${Shadow}
`

export const Info = styled.div<InfoProps>`
  width: 100%;
  ::before {
    content: ${({ skillName }) => skillName && `'${skillName}';`};
    display: block;
    text-transform: capitalize;
    font-size: 12px;
    font-weight: 300;
    color: var(--onSurface);
  }
`

export const ProgressBar = styled.div`
  position: relative;
  height: 4px;
  background-color: var(--primaryVariant);
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.1);
`

export const BarFill = styled.div`
  display: block;
  height: 100%;
  background-color: var(--primary);
  transition: width 0.4s ease-out;
`

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;

  ${Value} {
    margin-right: 6px;
    ${({ highlight }) => highlight && 'background-color: var(--green);'}
  }

  ${ProgressBar} {
    margin-top: 1px;
  }

  ${BarFill} {
    ${({ highlight }) => highlight && 'background-color: var(--green);'}
  }
`
