import { ReactElement, JSXElementConstructor } from 'react'

export interface LinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>>
  href: string
  exact?: boolean
}
