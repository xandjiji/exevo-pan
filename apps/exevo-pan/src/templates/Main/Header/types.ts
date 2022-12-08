export type HeaderProps = {
  clean?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export type NavItem = {
  href: string
  exact?: boolean
  icon: React.ReactElement
  title: string
}
