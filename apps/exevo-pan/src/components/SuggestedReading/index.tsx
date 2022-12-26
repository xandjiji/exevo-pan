import Image from 'next/image'

/* type SuggestedReadingProps = {} */

const SuggestedReading = () => (
  <div>
    <p className="mb-2 text-xs tracking-wide">Suggested reading:</p>

    <div className="card flex items-center gap-2 p-1.5">
      <div className="bg-primaryVariant rounded-md p-1">
        <Image
          src="/blog/thumbnails/charms.png"
          width={32}
          height={32}
          alt="charms"
        />
      </div>

      <h5 className="text-base">
        Which charms are the best for each vocation?
      </h5>
    </div>
  </div>
)

export default SuggestedReading
