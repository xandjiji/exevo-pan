import { links } from './Links'

const standard = JSON.stringify({
  '@context': 'http://schema.org/',
  '@type': 'WebSite',
  url: links.CANONICAL,
})

export const jsonld = { standard }
