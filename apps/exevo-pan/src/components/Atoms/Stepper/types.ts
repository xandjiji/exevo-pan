export type Step = {
  title: string
  icon?: JSX.Element & React.ReactElement<React.SVGAttributes<SVGElement>>
  onClick?: (index: number) => void
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
}
