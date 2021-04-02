import React, { useState } from 'react';
import FavButton from './FavButton.styled';

import { getFavArray, saveToLocalStorage } from '../../utils/localStorage';

import { ReactComponent as HeartIcon } from '../../assets/svgs/heart.svg';

export default ({ className, charData }) => {
    const isFav = () => {
        const favCharacters = getFavArray();
        return favCharacters.some(char => char.id === charData.id);
    };
    const [active, setActive] = useState(isFav());

    const handleClick = () => {
        setActive(prev => !prev);

        const favArray = getFavArray();
        const charIndex = findCharIndexById(charData.id);
        if (charIndex >= 0) {
            favArray.splice(charIndex, 1);
        } else {
            favArray.push(charData);
        }

        saveToLocalStorage('initialFavCharacterData', favArray);

        function findCharIndexById(id) {
            for (let i = 0; i < favArray.length; i++) {
                if (favArray[i].id === id) {
                    return i;
                }
            }
            return -1;
        }
    }

    return (
        <FavButton
            className={`${className || ''} ${active ? 'active' : ''} shadow clickable`}
            onClick={handleClick}>
            <HeartIcon />
        </FavButton>
    )
}