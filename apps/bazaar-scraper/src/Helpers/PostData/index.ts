import cheerio from 'cheerio/lib/index'

const itemQuantityRegex = new RegExp(/^[0-9]+(,[0-9]+)*x /)

export default class PostData {
  private normalizedName: Record<string, string> = {
    Noblewoman: 'Nobleman',
    Norsewoman: 'Norseman',
    'Retro Noblewoman': 'Retro Nobleman',
    'Sun Priestess': 'Sun Priest',
  }

  private normalizeFemaleOutfit(name: string): string {
    return this.normalizedName[name] ?? name
  }

  outfits(content: string): Outfit[] {
    const $ = cheerio.load(content)
    const icons = $('.CVIcon')

    const outfits: Outfit[] = []
    icons.each((_, element) => {
      const { title } = element.attribs
      const [name, addons] = title.split(' (')
      const type = +!!addons.includes('1') + +!!addons.includes('2') * 2

      outfits.push({ name: this.normalizeFemaleOutfit(name), type })
    })

    return outfits
  }

  mounts(content: string): string[] {
    const $ = cheerio.load(content)
    const icons = $('.CVIcon')

    const mounts: string[] = []
    icons.each((_, element) => {
      const name = element.attribs.title
      mounts.push(name)
    })

    return mounts
  }

  items(content: string): CharacterItem[] {
    const $ = cheerio.load(content)
    const icons = $('.CVIcon')

    const items: CharacterItem[] = []
    icons.each((_, element) => {
      const { title } = element.attribs

      let amount = 1
      const rawItemName = title.replace(itemQuantityRegex, (match) => {
        const [stringAmount] = match.replace(/,/g, '').split('x')
        if (stringAmount) {
          amount = +stringAmount
        }

        return ''
      })

      const [itemName] = rawItemName.split('\n')

      items.push({ name: itemName, amount })
    })

    return items
  }
}
