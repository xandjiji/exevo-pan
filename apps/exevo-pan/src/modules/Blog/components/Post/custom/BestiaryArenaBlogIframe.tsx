const Component = ({ tag }: { tag: string }) => (
  <div style={{ position: 'relative', margin: '0 auto', height: 313 }}>
    <iframe
      src={`https://bestiaryarena.com/iframe-obs-4?tag=${tag}`}
      width="277"
      height="313"
      scrolling="no"
      loading="lazy"
      frameBorder="0"
      title="Bestiary Arena"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  </div>
)

export default Component
