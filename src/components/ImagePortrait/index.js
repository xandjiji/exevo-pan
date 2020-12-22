import React from 'react';
import ImagePortrait from './ImagePortrait.styled';

export default ({ src, alt, title }) => {

    return (
        <ImagePortrait className="shadow">
            <img src={src} alt={alt} title={title} />
        </ImagePortrait>
    )
}