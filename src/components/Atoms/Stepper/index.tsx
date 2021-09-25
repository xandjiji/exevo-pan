import { Fragment } from 'react'
import * as S from './styles'
import { StepperProps } from './types'

const Stepper = ({ steps, ...props }: StepperProps): JSX.Element => (
  <S.Wrapper {...props}>
    {steps.map((step, index, stepArray) => (
      <Fragment key={step.title}>
        <S.StepItem onClick={() => step.onClick?.(index)}>
          <S.Circle>{step.icon ?? index}</S.Circle>
          <S.Title>{step.title}</S.Title>
        </S.StepItem>
        {index < stepArray.length - 1 && <S.Separator />}
      </Fragment>
    ))}
  </S.Wrapper>
)

export default Stepper
