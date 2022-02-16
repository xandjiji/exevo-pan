import cheerio from 'cheerio/lib/index'

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

  // @ ToDo:
  // regex for item name
  // filter item description
  // ignore item filter

  items(content: string): CharacterItem[] {
    const $ = cheerio.load(content)
    const icons = $('.CVIcon')

    const items: CharacterItem[] = []
    icons.each((_, element) => {
      const { title } = element.attribs

      items.push({ name: title, amount: 0 })
    })

    return items
  }
}
