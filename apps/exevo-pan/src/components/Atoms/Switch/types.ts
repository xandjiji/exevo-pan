export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: JSX.Element & React.ReactElement<React.SVGAttributes<SVGElement>>
}
