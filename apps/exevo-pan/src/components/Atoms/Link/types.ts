export type LinkProps = JSX.IntrinsicElements['a'] & {
  href: string
  exact?: boolean
  scrollOnCurrent?: boolean
}
