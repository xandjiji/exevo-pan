import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { StepperProps } from './types'

const Stepper = ({
  steps,
  currentStep,
  ...props
}: StepperProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      {steps.map((step, index, stepArray) => {
        const isCurrent = index === currentStep
        const isCompleted = index < currentStep
        const isLast = index === stepArray.length - 1

        const stepDescriptionId = `step-item-${step.title}`

        return (
          <S.StepItem
            key={step.title}
            onClick={() => step.onClick?.(index)}
            style={{ flexGrow: +!isLast }}
            type="button"
            aria-current={isCurrent ? 'step' : undefined}
            data-completed={isCompleted}
            aria-labelledby={stepDescriptionId}
          >
            <S.Circle>
              {isCompleted ? (
                <S.CompletedIcon aria-label={common.StepperCompletedLabel} />
              ) : (
                step.icon ?? index + 1
              )}
              <S.Title id={stepDescriptionId}>{step.title}</S.Title>
            </S.Circle>
            {!isLast && <S.Separator />}
          </S.StepItem>
        )
      })}
    </S.Wrapper>
  )
}

export default Stepper
