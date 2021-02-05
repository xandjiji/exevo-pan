import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import CharGrid from './CharGrid.styled';
import Paginator from '../Paginator';
import CharCard from '../CharCard';

import SideDrawerContext from '../../contexts/SideDrawer/context';
import CharacterDataContext from '../../contexts/CharacterData/context';

import { ReactComponent as FilterIcon } from '../../assets/svgs/filter.svg';

export default ({ itemsPerPage }) => {
    const gridRef = useRef(null);
    const listRef = useRef(null);

    const { toggleSideDrawer } = useContext(SideDrawerContext);
    const { characterData } = useContext(CharacterDataContext);

    const [charList, setCharList] = useState(characterData.slice(0, 30));
    const [index, setIndex] = useState(0);

    const sliceList = useCallback((index) => {
        return characterData.slice(index * itemsPerPage, ((index + 1) * itemsPerPage));
    }, [characterData, itemsPerPage]);

    const handleAction = (value) => {
        setIndex(value);
        gridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        setCharList(sliceList(index));
    }, [index, characterData, sliceList]);

    useEffect(() => {
        handleAction(0);
    }, [characterData])

    return (
        <CharGrid className="custom-scrollbar" ref={gridRef}>
            <div className="grid-header shadow inner-container">
                <FilterIcon className="sort-icon clickable" onClick={toggleSideDrawer} />

                <Paginator
                    itemsPerPage={itemsPerPage}
                    dataSize={characterData.length}
                    handleAction={handleAction}
                />
            </div>
            <div className="items-wrapper custom-scrollbar inner-container" ref={listRef}>
                {charList.map(item => <CharCard key={item.id} charData={item} />)}
            </div>
        </CharGrid>
    )
}