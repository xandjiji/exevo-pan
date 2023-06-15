import { cloneElement } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { CheckIcon } from 'assets/svgs'
import { StepperProps } from './types'

const Stepper = ({
  className,
  isFinished = false,
  steps,
  currentStep,
  ...props
}: StepperProps) => {
  const { common } = useTranslations()

  return (
    <div className={clsx('flex justify-between pb-8', className)} {...props}>
      {steps.map((step, index, stepArray) => {
        const isCurrent = index === currentStep
        const isCompleted = index < currentStep
        const isLast = index === stepArray.length - 1

        const stepDescriptionId = `step-item-${step.title}`

        return (
          <button
            key={step.title}
            onClick={() => step.onClick?.(index)}
            style={{ flexGrow: +!isLast }}
            type="button"
            aria-current={isCurrent ? 'step' : undefined}
            aria-labelledby={stepDescriptionId}
            className={clsx(
              'flex items-center',
              !isFinished && 'cursor-pointer',
            )}
            data-completed={isCompleted}
          >
            <div
              className={clsx(
                'relative grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold transition-colors',
                isFinished
                  ? 'bg-green'
                  : isCurrent || isCompleted
                  ? 'bg-primary'
                  : 'bg-separator',
                isCurrent || isCompleted ? 'text-onPrimary' : 'text-onSurface',
                isCurrent && 'shadow-md',
              )}
            >
              {isCompleted ? (
                <CheckIcon
                  aria-label={common.StepperCompletedLabel}
                  className="fill-onPrimary animate-fadeIn h-6 w-6 transition-all"
                />
              ) : step.icon ? (
                cloneElement(step.icon, {
                  className: clsx(
                    'w-[19px] h-[19px]',
                    isCurrent || isCompleted
                      ? 'fill-onPrimary'
                      : 'fill-onSurface',
                  ),
                })
              ) : (
                index + 1
              )}
              <h2
                id={stepDescriptionId}
                className={clsx(
                  'text-onSurface absolute left-1/2 text-base tracking-wider transition-all',
                  isCurrent ? 'font-bold' : 'font-light',
                )}
                style={{
                  top: 'calc(100% + 12px)',
                  transform: 'translateX(-50%)',
                }}
              >
                {step.title}
              </h2>
            </div>
            {!isLast && (
              <div
                className={clsx(
                  'mx-4 h-[3px] w-full grow opacity-50 transition-colors',
                  isFinished
                    ? 'bg-green'
                    : isCompleted
                    ? 'bg-primary'
                    : 'bg-separator',
                )}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Stepper
