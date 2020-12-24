import React, { useState, useMemo } from 'react';
import Paginator from './Paginator.styled';

import SortIcon from '../../assets/svgs/sort.svg';
import NextIcon from '../../assets/svgs/next.svg';
import LastIcon from '../../assets/svgs/last.svg';

export default ({ itemsPerPage, dataSize, handleAction }) => {

    const [index, setIndex] = useState(0);
    const pageCount = useMemo(() => Math.ceil(dataSize / itemsPerPage), [dataSize, itemsPerPage]);

    const handleClick = (newValue) => {
        if (newValue >= 0 && newValue < pageCount) {
            setIndex(newValue);
            handleAction(newValue);
        }
    }

    const handleKey = (event) => {
        if (event.key === 'ArrowLeft') {
            handleClick(index - 1);
        } else if (event.key === 'ArrowRight') {
            handleClick(index + 1);
        }
    }

    return (
        <Paginator className="shadow inner-container">
            <SortIcon className="sort-icon clickable" />

            <div className="paginating-wrapper">
                <div className="tracker">
                    {`${(index * itemsPerPage) + 1} - ${index + 1 !== pageCount ? (index + 1) * itemsPerPage : dataSize} of ${dataSize}`}
                </div>
                <div className="cursor-wrapper">
                    <div
                        className={`cursor clickable mirror ${index === 0 ? 'disabled' : ''}`}
                        onClick={() => handleClick(0)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(event) => handleKey(event)}
                    >
                        <LastIcon />
                    </div>
                    <div
                        className={`cursor clickable mirror ${index === 0 ? 'disabled' : ''}`}
                        onClick={() => handleClick(index - 1)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(event) => handleKey(event)}
                    >
                        <NextIcon />
                    </div>

                    <div
                        className={`cursor clickable ${index + 1 >= pageCount ? 'disabled' : ''}`}
                        onClick={() => handleClick(index + 1)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(event) => handleKey(event)}
                    >
                        <NextIcon />
                    </div>
                    <div
                        className={`cursor clickable ${index + 1 >= pageCount ? 'disabled' : ''}`}
                        onClick={() => handleClick(pageCount - 1)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(event) => handleKey(event)}
                    >
                        <LastIcon />
                    </div>
                </div>

            </div>
        </Paginator>
    )
}