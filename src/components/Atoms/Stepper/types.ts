export type Step = {
  title: string
  icon?: React.ReactNode
  onClick?: (index: number) => void
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
}
