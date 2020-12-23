import React, { useEffect, useState } from 'react';
import ImagePortrait from './ImagePortrait.styled';

export default ({ src, alt, title }) => {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!error) {
                setLoaded(true);
            }
        }, 500);

        return () => clearTimeout(timeout);
    },[error])


    return (
        <ImagePortrait className="shadow">
            <img
                className={loaded ? 'loaded' : 'loading'}
                src={src}
                alt={alt}
                title={title}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
            <div className={loaded ? 'loader hidden' : 'loader'}></div>
        </ImagePortrait>
    )
}