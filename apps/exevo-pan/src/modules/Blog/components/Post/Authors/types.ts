interface Author extends SingleCharacterData {
  outfitSrc: string
}

export interface AuthorsProps {
  author: Author
  translator?: Author
}
