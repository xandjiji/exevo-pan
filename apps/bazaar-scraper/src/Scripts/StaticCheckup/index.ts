import { broadcast } from 'logging'
import { Static, History } from 'Data'

const main = async (): Promise<void> => {
  const staticData = new Static()
  const history = new History()

  await staticData.load()
  await history.load()

  const allAuctions = history.getEntireHistory()

  broadcast('Checking static files...', 'neutral')
  allAuctions.forEach(
    ({ sex, outfits, storeOutfits, mounts, storeMounts, storeItems }) => {
      const sexPrefix: 'male' | 'female' = sex ? 'female' : 'male'

      outfits.forEach(({ name, type }) =>
        staticData.checkFile(
          staticData.addPrefix(sexPrefix, `${name}_${type}.gif`),
        ),
      )
      storeOutfits.forEach(({ name, type }) =>
        staticData.addPrefix(sexPrefix, `${name}_${type}.gif`),
      )

      mounts.forEach((name) => staticData.checkFile(`${name}.gif`))
      storeMounts.forEach((name) => staticData.checkFile(`${name}.gif`))

      storeItems.forEach(({ name }) => staticData.checkFile(`${name}.gif`))
    },
  )

  const missingFiles = [...staticData.getMissingFiles()]
  broadcast(`Task finished! ${missingFiles.length} missing files`, 'success')
  console.log(missingFiles)
}

export default main
