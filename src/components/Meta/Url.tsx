const Url = ({ content = 'https://exevopan.com/' }) => (
  <>
    <link rel="canonical" href={content} />
    <meta property="og:url" content={content} />
    <meta property="twitter:url" content={content} />
  </>
)

export default Url
