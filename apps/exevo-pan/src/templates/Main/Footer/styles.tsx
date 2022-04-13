/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import NextLink from 'next/link'

export const Link = ({
  className,
  rel,
  ...props
}: JSX.IntrinsicElements['a']) => (
  <a
    rel={clsx('noopener noreferrer external', rel)}
    className={clsx('text-onPrimary text-xs tracking-wider', className)}
    target="_blank"
    {...props}
  />
)

export const ListItem = (args: JSX.IntrinsicElements['li']) => (
  <li
    className="text-s text-onPrimary/50 after:ml-3 after:content-['|'] last:after:content-['']"
    {...args}
  />
)

export const ListLink = ({ href, ...props }: JSX.IntrinsicElements['a']) => (
  <NextLink href={href as string}>
    <a
      className="text-s text-onPrimary cursor-pointer tracking-wider md:text-base"
      {...props}
    />
  </NextLink>
)
