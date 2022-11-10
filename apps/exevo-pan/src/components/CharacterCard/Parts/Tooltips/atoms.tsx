/* eslint-disable jsx-a11y/heading-has-content */
import { cloneElement } from 'react'
import clsx from 'clsx'
import {
  MagicIcon,
  CharmsIcon,
  BookIcon,
  PeopleIcon,
  StarIcon,
  GoblinIcon,
} from 'assets/svgs'
import { IconProps } from './types'

export const TitleWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['h5']) => (
  <h5
    className={clsx(
      'text-tsm flex flex-nowrap items-center font-normal',
      className,
    )}
    {...props}
  />
)

const Icon = ({ icon, className, ...props }: IconProps) =>
  cloneElement(icon, {
    className: clsx(
      'mr-1 shrink-0 w-[18px] h-[18px] fill-onSurface',
      className,
    ),
    ...props,
  })

export const Icons: Record<string, React.FC<JSX.IntrinsicElements['svg']>> = {
  Imbuement: (args) => <Icon icon={<MagicIcon />} {...args} />,
  Charm: (args) => <Icon icon={<CharmsIcon />} {...args} />,
  Quest: (args) => <Icon icon={<BookIcon />} {...args} />,
  Hireling: (args) => <Icon icon={<PeopleIcon />} {...args} />,
  Achievements: (args) => <Icon icon={<StarIcon />} {...args} />,
  Boss: (args) => <Icon icon={<GoblinIcon />} {...args} />,
}
