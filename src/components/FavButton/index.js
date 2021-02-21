import React, { useState, useContext } from 'react';
import FavButton from './FavButton.styled';

import CharacterDataContext from '../../contexts/CharacterData/context';

import { ReactComponent as HeartIcon } from '../../assets/svgs/heart.svg';

export default ({ className, charData }) => {
    const { favCharacters, dispatchFavCharacters } = useContext(CharacterDataContext);

    const isFav = () => favCharacters.some(char => char.id === charData.id);
    const [active, setActive] = useState(isFav());

    const handleClick = () => {
        setActive(prev => !prev);
        dispatchFavCharacters({
            type: 'TOGGLE_FAV',
            charData
        })
    }

    return (
        <FavButton
            className={`${className || ''} ${active ? 'active' : ''}`}
            onClick={handleClick}>
            <HeartIcon className="clickable" />
        </FavButton>
    )
}