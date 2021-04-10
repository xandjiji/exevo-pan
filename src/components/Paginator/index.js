import React, { useState, useEffect, useMemo, useContext } from 'react';

import Paginator from './Paginator.styled';

import UrlParametersContext from '../../contexts/UrlParameters/context';

import { ReactComponent as NextIcon } from '../../assets/svgs/next.svg';
import { ReactComponent as LastIcon } from '../../assets/svgs/last.svg';

export default ({ itemsPerPage, dataSize, handleAction, className }) => {
    const { params, setParamByKey } = useContext(UrlParametersContext);

    const indexFromUrl = params.pageIndex || 0;

    const [index, setIndex] = useState(indexFromUrl);
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
        setParamByKey('pageIndex', index);
    }, [setParamByKey, index]);

    useEffect(() => {
        handleAction(index);
    }, [index, handleAction]);

    return (
        <Paginator className={className}>
            <div className="tracker">
                {dataSize ?
                    `${(indexFromUrl * itemsPerPage) + 1} - ${indexFromUrl + 1 !== pageCount ? (indexFromUrl + 1) * itemsPerPage : dataSize} of ${dataSize}`
                    : 'No characters found'
                }
            </div>
            <div className="cursor-wrapper">
                <div
                    className={`cursor clickable mirror ${indexFromUrl === 0 ? 'disabled' : ''}`}
                    onClick={() => setIndex(0)}
                    role="button"
                    tabIndex="0"
                    aria-label="First page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <LastIcon />
                </div>
                <div
                    className={`cursor clickable mirror ${indexFromUrl === 0 ? 'disabled' : ''}`}
                    onClick={() => setIndex(prev => prev - 1)}
                    role="button"
                    tabIndex="0"
                    aria-label="Previous page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <NextIcon />
                </div>

                <div
                    className={`cursor clickable ${indexFromUrl + 1 >= pageCount ? 'disabled' : ''}`}
                    onClick={() => setIndex(prev => prev + 1)}
                    role="button"
                    tabIndex="0"
                    aria-label="Next page"
                    onKeyDown={(event) => handleKey(event)}
                >
                    <NextIcon />
                </div>
                <div
                    className={`cursor clickable ${indexFromUrl + 1 >= pageCount ? 'disabled' : ''}`}
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