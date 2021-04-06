import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import Paginator from './Paginator.styled';

import { ReactComponent as NextIcon } from '../../assets/svgs/next.svg';
import { ReactComponent as LastIcon } from '../../assets/svgs/last.svg';

const { search, pathname } = window.location;
const params = new URLSearchParams(search);

export default ({ itemsPerPage, dataSize, handleAction, className }) => {

    const history = useHistory();

    const [index, setIndex] = useState(Number(params.get('pageIndex')) || 0);
    const pageCount = useMemo(() => Math.ceil(dataSize / itemsPerPage), [dataSize, itemsPerPage]);

    const handleClick = (newValue) => {
        if (newValue >= 0 && newValue < pageCount) {
            setIndex(newValue);
        }
    }

    const handleKey = (event) => {
        if (event.key === 'ArrowLeft') {
            handleClick(index - 1);
        } else if (event.key === 'ArrowRight') {
            handleClick(index + 1);
        }
    }

    useEffect(() => {
        /* setIndex(0); */
    }, [dataSize]);

    useEffect(() => {
        if (index === 0) {
            params.delete('pageIndex');
        } else {
            params.set('pageIndex', index);
        }

        history.replace(`${pathname}?${params.toString()}`);
    }, [index, history]);

    useEffect(() => {
        handleAction(index);
    }, [index, handleAction]);

    return (
        <Paginator className={className}>
            <div className="tracker">
                {dataSize ?
                    `${(index * itemsPerPage) + 1} - ${index + 1 !== pageCount ? (index + 1) * itemsPerPage : dataSize} of ${dataSize}`
                    : 'No characters found'
                }
            </div>
            <div className="cursor-wrapper">
                <div
                    className={`cursor clickable mirror ${index === 0 ? 'disabled' : ''}`}
                    onClick={() => setIndex(0)}
                    role="button"
                    tabIndex="0"
                    aria-label="First page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <LastIcon />
                </div>
                <div
                    className={`cursor clickable mirror ${index === 0 ? 'disabled' : ''}`}
                    onClick={() => setIndex(prev => prev - 1)}
                    role="button"
                    tabIndex="0"
                    aria-label="Previous page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <NextIcon />
                </div>

                <div
                    className={`cursor clickable ${index + 1 >= pageCount ? 'disabled' : ''}`}
                    onClick={() => setIndex(prev => prev + 1)}
                    role="button"
                    tabIndex="0"
                    aria-label="Next page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <NextIcon />
                </div>
                <div
                    className={`cursor clickable ${index + 1 >= pageCount ? 'disabled' : ''}`}
                    onClick={() => setIndex(pageCount - 1)}
                    role="button"
                    tabIndex="0"
                    aria-label="Last page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <LastIcon />
                </div>
            </div>
        </Paginator>
    )
}