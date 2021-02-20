import React, { useState } from 'react';
import FavButton from './FavButton.styled';

import { ReactComponent as HeartIcon } from '../../assets/svgs/heart.svg';

export default ({ className, charData }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(prev => !prev);
    }

    return (
        <FavButton
            className={`${className || ''} ${active ? 'active' : ''}`}
            onClick={handleClick}>
            <HeartIcon className="clickable" />
        </FavButton>
    )
}