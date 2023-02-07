export type HeaderProps = {
  clean?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export type NavItem = {
  href: string
  exact?: boolean
  icon: JSX.Element
  title: string
}
