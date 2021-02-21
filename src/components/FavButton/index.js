import React, { useState, useEffect, useContext, useCallback } from 'react';
import FavButton from './FavButton.styled';

import CharacterDataContext from '../../contexts/CharacterData/context';

import { ReactComponent as HeartIcon } from '../../assets/svgs/heart.svg';

export default ({ className, charData }) => {
    const { favCharacters, dispatchFavCharacters } = useContext(CharacterDataContext);

    const isFav = useCallback(() =>
        favCharacters.some(char => char.id === charData.id),
        [favCharacters, charData]
    );
    const [active, setActive] = useState(isFav());

    const handleClick = () => {
        setActive(prev => !prev);
        dispatchFavCharacters({
            type: 'TOGGLE_FAV',
            charData
        })
    }

    useEffect(() => {
        if (isFav()) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [favCharacters, isFav]);

    return (
        <FavButton
            className={`${className || ''} ${active ? 'active' : ''}`}
            onClick={handleClick}>
            <HeartIcon className="clickable" />
        </FavButton>
    )
}