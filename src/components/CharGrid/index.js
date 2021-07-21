import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import CharGrid from './CharGrid.styled';
import CharCard from '../CharCard';
import { Switch, RadioGroup, RadioButton, Paginator } from 'components/Atoms';
import { Tooltip } from 'components/Organisms';

import UrlParametersContext from '../../contexts/UrlParameters/context';
import SideDrawerContext from '../../contexts/SideDrawer/context';

import { ReactComponent as FilterIcon } from '../../assets/svgs/filter.svg';
import { ReactComponent as SortIcon } from '../../assets/svgs/sort.svg';

const sortingModes = ['Auction End', 'Level', 'Price', 'Price (bidded only)'];

export default ({ itemsPerPage, data, initialSort, initialOrder }) => {
    const gridRef = useRef(null);
    const listRef = useRef(null);

    const { params, setParamByKey } = useContext(UrlParametersContext);
    const { toggleSideDrawer } = useContext(SideDrawerContext);

    const indexFromUrl = params.pageIndex || 0;

    const [sortedData, setSortedData] = useState(data);
    const [charList, setCharList] = useState(sortedData.slice(0, 30));
    const [index, setIndex] = useState(indexFromUrl);
    const [selectedSort, setSelectedSort] = useState(params.initialSort || initialSort);
    const [descendingOrder, setDescendingOrder] = useState(params.initialOrder === null ? initialOrder : params.initialOrder);

    const sliceList = useCallback((index) => {
        return sortedData.slice(index * itemsPerPage, ((index + 1) * itemsPerPage));
    }, [sortedData, itemsPerPage]);

    useEffect(() => {
        setIndex(indexFromUrl);
        if (gridRef.current && listRef.current) {
            gridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [indexFromUrl]);

    useEffect(() => {
        setCharList(sliceList(index));
    }, [index, sortedData, sliceList]);

    useEffect(() => {
        setSortedData(applySort(
            data,
            sortingModes[selectedSort],
            descendingOrder
        ));

        if (selectedSort !== initialSort) {
            setParamByKey('initialSort', selectedSort);
        } else {
            setParamByKey('initialSort', null);
        }

        if (descendingOrder !== initialOrder) {
            setParamByKey('initialOrder', descendingOrder.toString());
        } else {
            setParamByKey('initialOrder', null);
        }
    }, [data, selectedSort, initialSort, descendingOrder, initialOrder, setParamByKey]);

    return (
        <CharGrid className="custom-scrollbar" ref={gridRef}>
            <header className="grid-header shadow inner-container">
                <div className="left-header-menu">
                    <FilterIcon aria-controls="filter-drawer" className="icon clickable" onClick={toggleSideDrawer} />
                    <div className="sorting-wrapper">
                        <Tooltip
                            role="dialog"
                            aria-label="Set the sorting order and criteria"
                            trigger="click"
                            content={
                                <div className="options-wrapper">
                                    <Switch
                                        active={descendingOrder}
                                        onClick={() => setDescendingOrder(prev => !prev)}
                                        aria-label="Sort by descending order"
                                    >
                                        Descending
                                    </Switch>
                                    <RadioGroup
                                        indexValue={selectedSort}
                                        onChange={(index) => setSelectedSort(index)}
                                        aria-label="Sort characters by"
                                    >
                                        <RadioButton>Auction End</RadioButton>
                                        <RadioButton>Level</RadioButton>
                                        <RadioButton>Price</RadioButton>
                                        <RadioButton>Price (bidded only)</RadioButton>
                                    </RadioGroup>
                                </div>
                            }
                        >
                            <SortIcon aria-haspopup="dialog" className="icon clickable" />
                        </Tooltip>
                    </div>
                </div>

                <Paginator
                    aria-controls="character-grid"
                    pageSize={itemsPerPage}
                    totalItems={sortedData.length}
                    currentPage={params.pageIndex + 1}
                    onChange={(newPage) => setParamByKey('pageIndex', newPage - 1)}
                    noItemsMessage="No characters found"
                />
            </header>
            <main id="character-grid" className="items-wrapper custom-scrollbar inner-container" ref={listRef}>
                {charList.map(item => <CharCard key={item.id} characterData={item} />)}
            </main>
        </CharGrid>
    )
}

const applySort = (oldData, sortingMode, descendingOrder) => {

    const data = [...oldData];

    const byAuctionEnd = (a, b) => {
        if (!descendingOrder) return a.auctionEnd - b.auctionEnd;
        return b.auctionEnd - a.auctionEnd;
    }

    const byLevel = (a, b) => {
        if (!descendingOrder) return a.level - b.level;
        return b.level - a.level;
    }

    const byPrice = (a, b) => {
        if (!descendingOrder) return a.currentBid - b.currentBid;
        return b.currentBid - a.currentBid;
    }

    switch (sortingMode) {
        case 'Auction End':
            return data.sort(byAuctionEnd);

        case 'Level':
            return data.sort(byLevel);

        case 'Price':
            return data.sort(byPrice);

        case 'Price (bidded only)':
            return data.filter(item => item.hasBeenBidded).sort(byPrice);

        default:
            return data;
    }
}