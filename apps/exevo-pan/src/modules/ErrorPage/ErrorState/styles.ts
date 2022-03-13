/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import styled, { css } from 'styled-components'
import { Smooth } from 'styles'
import ErrorIconSvg from 'assets/svgs/error.svg'

export const Wrapper = styled.main`
  /* display: grid;
  grid-template-rows: 0.8fr 0.8fr; */
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  * {
    ${Smooth}
  }
`

const SectionStyle = css`
  padding-top: 16px;
  padding-bottom: 16px;
  flex-grow: 1;
`

export const Top = styled.div`
  ${SectionStyle}

  display: flex;
  justify-content: center;
  align-items: flex-end;

  background-color: var(--surface);
`

export const Title = styled.span`
  font-size: 64px;
  font-weight: 700;
  letter-spacing: 8px;
  color: var(--primary);
`

export const Bottom = styled.div`
  ${SectionStyle}

  background-color: var(--primary);
  text-align: center;
`

export const ErrorIcon = styled(ErrorIconSvg)`
  margin-bottom: 32px;
  width: 128px;
  height: 128px;
  fill: var(--onPrimary);
`

export const Paragraph = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  letter-spacing: 1.5px;
  color: var(--onPrimary);
`
