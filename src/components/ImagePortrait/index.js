import React, { useState } from 'react';
import ImagePortrait from './ImagePortrait.styled';

export default ({ src, alt, title }) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <ImagePortrait className="shadow">
            <img
                className={loaded ? 'loaded' : 'loading'}
                src={src}
                alt={alt}
                title={title}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(false)}
            />
            <div className={loaded ? 'loader hidden' : 'loader'}></div>
            
        </ImagePortrait>
    )
}