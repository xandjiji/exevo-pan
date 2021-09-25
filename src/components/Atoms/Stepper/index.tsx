import * as S from './styles'
import { StepperProps } from './types'

const Stepper = ({
  steps,
  currentStep,
  ...props
}: StepperProps): JSX.Element => (
  <S.Wrapper {...props}>
    {steps.map((step, index, stepArray) => {
      const isLast = index === stepArray.length - 1

      return (
        <S.StepItem
          key={step.title}
          onClick={() => step.onClick?.(index)}
          aria-current={currentStep === index ? 'step' : undefined}
          style={{ flexGrow: +!isLast }}
        >
          <S.Circle>
            {step.icon ?? index + 1}
            <S.Title>{step.title}</S.Title>
          </S.Circle>
          {!isLast && <S.Separator />}
        </S.StepItem>
      )
    })}
  </S.Wrapper>
)

export default Stepper
