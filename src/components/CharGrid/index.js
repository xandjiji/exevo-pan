import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import CharGrid from './CharGrid.styled';
import Paginator from '../Paginator';
import CharCard from '../CharCard';
import DialogBox from '../DialogBox';
import RadioInput from '../RadioInput';
import Switch from '../Switch';

import SideDrawerContext from '../../contexts/SideDrawer/context';
import CharacterDataContext from '../../contexts/CharacterData/context';

import { ReactComponent as FilterIcon } from '../../assets/svgs/filter.svg';
import { ReactComponent as SortIcon } from '../../assets/svgs/sort.svg';

const sortingModes = ['Auction End', 'Level', 'Price', 'Price (bidded only)'];

export default ({ itemsPerPage }) => {
    const gridRef = useRef(null);
    const listRef = useRef(null);

    const { toggleSideDrawer } = useContext(SideDrawerContext);
    const { initialCharacterData, characterData, dispatchInitialData } = useContext(CharacterDataContext);

    const [charList, setCharList] = useState(characterData.slice(0, 30));
    const [index, setIndex] = useState(0);
    const [isSortingOpen, setSortingOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(0);
    const [descendingOrder, setDescendingOrder] = useState(false);

    const sliceList = useCallback((index) => {
        return characterData.slice(index * itemsPerPage, ((index + 1) * itemsPerPage));
    }, [characterData, itemsPerPage]);

    const handleAction = (value) => {
        setIndex(value);
        if (gridRef.current && listRef.current) {
            gridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        setCharList(sliceList(index));
    }, [index, characterData, sliceList]);

    useEffect(() => {
        handleAction(0);
    }, [characterData]);

    useEffect(() => {
        setTimeout(() => {
            dispatchInitialData({
                type: 'APPLY_SORT',
                sortingMode: sortingModes[selectedSort],
                descendingOrder
            });
        }, 200);
    }, [selectedSort, dispatchInitialData, descendingOrder]);

    if (initialCharacterData.length === 0) return null;

    return (
        <CharGrid className="custom-scrollbar" ref={gridRef}>
            <header className="grid-header shadow inner-container">
                <div className="left-header-menu">
                    <FilterIcon className="icon clickable" onClick={toggleSideDrawer} />
                    <div className="sorting-wrapper">
                        <SortIcon className="icon clickable" onClick={() => setSortingOpen(prev => !prev)} />
                        <DialogBox isOpen={isSortingOpen} setState={setSortingOpen}>
                            <div className="options-wrapper shadow">
                                <Switch active={descendingOrder} onClick={() => setDescendingOrder(prev => !prev)}>Descending</Switch>
                                {sortingModes.map((mode, index) => (
                                    <RadioInput
                                        key={index}
                                        active={selectedSort === index}
                                        onClick={() => setSelectedSort(index)}
                                    >
                                        {mode}
                                    </RadioInput>
                                ))}
                            </div>
                        </DialogBox>
                    </div>
                </div>

                <Paginator
                    itemsPerPage={itemsPerPage}
                    dataSize={characterData.length}
                    handleAction={handleAction}
                />
            </header>
            <main className="items-wrapper custom-scrollbar inner-container" ref={listRef}>
                {charList.map(item => <CharCard key={item.id} charData={item} />)}
            </main>
        </CharGrid>
    )
}