import { links } from './Links'

type WebApplicationConfig = {
  name: string
  url: string
  description?: string
  applicationCategory?: string
}

const website = {
  '@type': 'WebSite',
  name: 'Exevo Pan',
  url: links.CANONICAL,
}

const organization = {
  '@type': 'Organization',
  name: 'Exevo Pan',
  url: links.CANONICAL,
  logo: {
    '@type': 'ImageObject',
    url: `${links.CANONICAL}/logo-150x100.png`,
  },
}

const standard = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [website, organization],
})

const webApplication = ({
  name,
  url,
  description,
  applicationCategory = 'UtilitiesApplication',
}: WebApplicationConfig) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory,
    operatingSystem: 'Web',
  })

export const jsonld = { standard, webApplication }
