import React, { useContext, useState, useEffect } from 'react';
import AllCharacterData from '../../contexts/AllCharacterData';

import CharCard from '../CharCard';

const ITEMS_PER_PAGE = 30;

const CharGrid = () => {
    const data = useContext(AllCharacterData);
    const [charList, setCharList] = useState(data.slice(0, 30));
    const [index, setIndex] = useState(0);

    const sliceList = (index) => {
        return data.slice(index * ITEMS_PER_PAGE, (index * ITEMS_PER_PAGE) + ITEMS_PER_PAGE);
    }

    useEffect(() => {
        setCharList(sliceList(index));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    /* UPDATE WHEN USE FILTER? */
    useEffect(() => {
        setCharList(sliceList(index));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const handleClick = (newValue) => {
        if (newValue >= 0 && newValue < (data.length / ITEMS_PER_PAGE)) {
            setIndex(newValue);
        }
    }

    return (
        <>
            <h1>Current index: {index}</h1>
            <button onClick={() => handleClick(index - 1)}>{'<'}</button>
            <button onClick={() => handleClick(index + 1)}>{'>'}</button>
            {charList.map(item => <CharCard key={item.id} charData={item} />)}
        </>
    )
}

export default CharGrid;