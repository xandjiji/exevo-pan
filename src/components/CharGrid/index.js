import React, { useContext, useState, useEffect } from 'react';
import CharGrid from './CharGrid.styled';
import Paginator from '../Paginator';
import CharCard from '../CharCard';

import AllCharacterData from '../../contexts/AllCharacterData';
import SortIcon from '../../assets/svgs/sort.svg';

export default ({ itemsPerPage, toggleDrawer }) => {
    const data = useContext(AllCharacterData);
    const [charList, setCharList] = useState(data.slice(0, 30));

    const [index, setIndex] = useState(0);

    const sliceList = (index) => {
        return data.slice(index * itemsPerPage, ((index + 1) * itemsPerPage));
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

    return (
        <CharGrid>
            <div className="grid-header shadow inner-container">
                <SortIcon className="sort-icon clickable" onClick={toggleDrawer} />

                <Paginator
                    itemsPerPage={itemsPerPage}
                    dataSize={data.length}
                    handleAction={setIndex}
                />
            </div>
            <div className="items-wrapper custom-scrollbar inner-container">
                {charList.map(item => <CharCard key={item.id} charData={item} />)}
            </div>
        </CharGrid>
    )
}