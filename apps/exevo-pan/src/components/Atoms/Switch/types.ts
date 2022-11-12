export interface SwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: JSX.Element & React.ReactElement<React.SVGAttributes<SVGElement>>
}
