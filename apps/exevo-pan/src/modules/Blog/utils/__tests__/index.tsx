import { generateSectionId } from '..'

type Case = { title: string; id: string }

describe('generateSectionId()', () => {
  const cases: Case[] = [
    { title: 'title', id: 'title' },
    { title: 'title with spaces', id: 'title-with-spaces' },
    { title: 'title-with-dashes', id: 'title-with-dashes' },
    { title: 'title with 9 numbers', id: 'title-with-9-numbers' },
    { title: 'title😋 @with 9, numbers!', id: 'title-with-9-numbers' },
    { title: 'prêço', id: 'pro' },
    { title: 'każdełj poęstępy', id: 'kadej-postpy' },
  ]

  test.each(cases)('it should generate the id correctly', ({ title, id }) => {
    expect(generateSectionId(title)).toEqual(id)
  })
})
