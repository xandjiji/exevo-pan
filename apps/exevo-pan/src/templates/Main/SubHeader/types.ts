import React from 'react'

export type NavItem = {
  title: string
  href: string
  icon: React.ReactNode
}

export interface SubHeaderProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  navItems: NavItem[]
}
