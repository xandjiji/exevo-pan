import React from 'react'

export type NavItem = {
  title: string
  href: string
  icon: React.ReactElement
}

export type SubHeaderProps = {
  navItems: NavItem[]
} & JSX.IntrinsicElements['nav']
