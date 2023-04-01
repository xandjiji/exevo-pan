/* eslint-disable jsx-a11y/anchor-has-content */
import { cloneElement } from 'react'
import { ServerIcon, MailIcon, GithubIcon, LinkedinIcon } from 'assets/svgs'
import { links, email } from 'Constants'
import { IconProps } from './types'

const ButtonLi = (args: JSX.IntrinsicElements['li']) => (
  <li
    {...args}
    className="card bg-primary text-tsm flex items-center py-3 px-6 shadow-sm"
  />
)

const Link = (args: JSX.IntrinsicElements['a']) => (
  <a
    {...args}
    className="text-onPrimary relative left-0 leading-relaxed transition-all hover:left-0.5"
  />
)

const Icon = ({ icon, ...props }: IconProps) =>
  cloneElement(icon, {
    ...props,
    className: 'mr-4 w-[18px] h-[18px] fill-onPrimary',
  })

const ContactSection = () => (
  <ul className="grid w-fit list-none gap-2">
    <ButtonLi>
      <Icon icon={<ServerIcon />} />
      <Link
        href={links.PERSONAL_WEBSITE}
        target="_blank"
        rel="noopener noreferrer external author"
      >
        {links.PERSONAL_WEBSITE}
      </Link>
    </ButtonLi>
    <ButtonLi>
      <Icon icon={<MailIcon />} />
      <Link href={links.EMAIL} target="_blank" rel="noopener noreferrer">
        {email.MY_EMAIL}
      </Link>
    </ButtonLi>
    <ButtonLi>
      <Icon icon={<GithubIcon />} />
      <Link
        href={links.GITHUB_PROFILE}
        target="_blank"
        rel="noopener noreferrer external author"
      >
        {links.GITHUB_PROFILE}
      </Link>
    </ButtonLi>
    <ButtonLi>
      <Icon icon={<LinkedinIcon />} />
      <Link
        href={links.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer external author"
      >
        {links.LINKEDIN}
      </Link>
    </ButtonLi>
  </ul>
)

export default ContactSection
