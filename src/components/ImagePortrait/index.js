import React from 'react';
import ImagePortrait from './ImagePortrait.styled';

export default ({ src, alt }) => {

    return (
        <ImagePortrait>
            <img src={src} alt={alt} />
        </ImagePortrait>
    )
}