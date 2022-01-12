import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), '_posts/en')
const POST_DATA_PATH = path.join(process.cwd(), 'src')

const getFileNames = () =>
  fs
    .readdirSync(POSTS_PATH)
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((filename) => filename)

const main = () => {
  const postFileNames = getFileNames()

  const postData = postFileNames
    .map((fileName) => {
      const filePath = `${POSTS_PATH}/${fileName}`

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
    })
    .sort((postA, postB) => postB.date - postA.date)

  fs.writeFileSync(`${POST_DATA_PATH}/PostData.json`, JSON.stringify(postData))
}

main()
