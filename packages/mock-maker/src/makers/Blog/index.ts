import * as faker from 'faker'

export const randomBlogPost = (): BlogPost => ({
  author: faker.name.firstName(),
  title: faker.lorem.words(faker.datatype.number({ min: 4, max: 10 })),
  description: faker.lorem.words(faker.datatype.number({ min: 15, max: 25 })),
  date: faker.time.recent(),
  slug: Array.from(
    {
      length: faker.datatype.number({
        min: 2,
        max: 5,
      }),
    },
    () => faker.lorem.word(),
  ).join('-'),
  tags: Array.from(
    {
      length: faker.datatype.number({
        min: 1,
        max: 3,
      }),
    },
    () => faker.lorem.word(),
  ),
  thumbnail: faker.image.imageUrl(),
  translator: faker.datatype.boolean() ? faker.name.firstName() : undefined,
  hidden: faker.datatype.boolean() ? true : undefined,
})

export const generateBlogPosts = (): BlogPost[] =>
  Array.from({ length: 123 }, randomBlogPost).sort((a, b) => b.date - a.date)
