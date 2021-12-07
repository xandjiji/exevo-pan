type ExtendedProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title' | 'onClick'
>

export interface AccordionProps extends ExtendedProps {
  title?: React.ReactNode
  open?: boolean
  initialValue?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
