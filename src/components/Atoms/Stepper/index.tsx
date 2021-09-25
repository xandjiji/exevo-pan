import * as S from './styles'
import { StepperProps } from './types'

const Stepper = ({
  steps,
  currentStep,
  ...props
}: StepperProps): JSX.Element => (
  <S.Wrapper {...props}>
    {steps.map((step, index, stepArray) => (
      <S.StepItem
        key={step.title}
        onClick={() => step.onClick?.(index)}
        aria-current={currentStep === index ? 'step' : undefined}
      >
        <S.Circle>
          {step.icon ?? index + 1}
          <S.Title>{step.title}</S.Title>
        </S.Circle>
        {index < stepArray.length - 1 && <S.Separator />}
      </S.StepItem>
    ))}
  </S.Wrapper>
)

export default Stepper
