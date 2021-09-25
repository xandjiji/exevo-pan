import * as S from './styles'
import { StepperProps } from './types'

const Stepper = ({
  steps,
  currentStep,
  ...props
}: StepperProps): JSX.Element => (
  <S.Wrapper {...props}>
    {steps.map((step, index, stepArray) => {
      const isCurrent = index === currentStep
      const isCompleted = index < currentStep
      const isLast = index === stepArray.length - 1

      return (
        <S.StepItem
          key={step.title}
          onClick={() => step.onClick?.(index)}
          aria-current={isCurrent ? 'step' : undefined}
          style={{ flexGrow: +!isLast }}
        >
          <S.Circle>
            {isCompleted ? (
              <S.CompletedIcon aria-label="step completed" />
            ) : (
              step.icon ?? index + 1
            )}
            <S.Title>{step.title}</S.Title>
          </S.Circle>
          {!isLast && <S.Separator />}
        </S.StepItem>
      )
    })}
  </S.Wrapper>
)

export default Stepper
