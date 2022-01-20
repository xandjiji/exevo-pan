import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const MAIN_DIRECTORY = 'en'
const SAMPLE_POST = 'hello-world.mdx'
const POSTS_PATH = path.join(process.cwd(), '_posts')
const POST_DATA_PATH = path.join(process.cwd(), 'src')

const getFileNames = (dirent: string) =>
  fs
    .readdirSync(`${POSTS_PATH}/${dirent}`)
    .filter((filename) => /\.mdx?$/.test(filename) && filename !== SAMPLE_POST)
    .map((filename) => filename)

const readPostData = (fileName: string, localization: string): BlogPost => {
  const filePath = `${POSTS_PATH}/${localization}/${fileName}`

  const source = fs.readFileSync(filePath)
  const { data } = matter(source)

  const [slug] = fileName.split('.')

  const { date } = data
  const [day, month, year] = date.split('-')
  const timestamp = +new Date(`${month}-${day}-${year}`)

  return {
    ...data,
    slug,
    date: timestamp,
  } as BlogPost
}

const readAllPostFiles = (
  fileNames: string[],
  localization: string,
): BlogPost[] =>
  fileNames
    .map((fileName: string) => {
      try {
        return readPostData(fileName, localization)
      } catch {
        return readPostData(fileName, MAIN_DIRECTORY)
      }
    })
    .sort((postA, postB) => postB.date - postA.date)

const main = () => {
  const postFileNames = getFileNames(MAIN_DIRECTORY)

  const allPostData = {
    '/en': readAllPostFiles(postFileNames, 'en'),
    '/es': readAllPostFiles(postFileNames, 'es'),
    '/pl': readAllPostFiles(postFileNames, 'pl'),
    '/pt': readAllPostFiles(postFileNames, 'pt'),
  }

  fs.writeFileSync(
    `${POST_DATA_PATH}/PostData.json`,
    JSON.stringify(allPostData),
  )
}

main()
