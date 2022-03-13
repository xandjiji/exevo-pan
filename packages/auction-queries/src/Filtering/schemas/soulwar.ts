const SOULWAR_MINIMUM_LEVEL = 250
const SOULWAR_OUTFIT_NAME = 'Revenant'

const filterSkip: FilterSkip = ({ soulwarAvailable }): boolean =>
  !soulwarAvailable

const filterTest: FilterTest =
  () =>
  ({ level, outfits }): boolean =>
    level >= SOULWAR_MINIMUM_LEVEL &&
    !outfits.some(({ name }) => name === SOULWAR_OUTFIT_NAME)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
