const Description = ({
  content = 'Filter, search and follow statistics for Tibia characters on the official Char Bazaar!',
}) => (
  <>
    <meta name="description" content={content} />
    <meta property="twitter:description" content={content} />
    <meta property="og:description" content={content} />
    <meta property="og:type" content="website" />
  </>
)

export default Description
