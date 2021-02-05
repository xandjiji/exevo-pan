import React, { useState, useEffect, useRef, memo } from 'react';
import AutocompleteInput from './AutocompleteInput.styled';

export default memo(({ items, placeholder, onChange }) => {
    const uniqueID = useRef(Math.random())
    const inputRef = useRef(null);
    const [term, setTerm] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }

    const handleKey = (event) => {
        if(event.key === 'Enter') inputRef.current.blur();
    }

    useEffect(() => {
        const timeOutObj = setTimeout(() => onChange(term), 500);
        return () => clearTimeout(timeOutObj);
    }, [term, onChange]);

    const stopBubbling = (event) => {
        event.stopPropagation();
    }

    return (
        <AutocompleteInput
            onMouseDown={stopBubbling}
            onMouseUp={stopBubbling}
            onMouseMove={stopBubbling}
            className={term === '' ? null : 'active'}
        >
            <input
                list={uniqueID.current}
                placeholder={placeholder}
                value={term}
                onChange={handleChange}
                onKeyDown={handleKey}
                ref={inputRef}
            />

            <datalist id={uniqueID.current}>
                {items.map((item, index) => {
                    return (
                        <option
                            key={index}
                            value={item}
                            aria-label="Input option"
                        />
                    )
                })}
            </datalist>

            {/* eslint-disable */}
            <div
                className="reset-button"
                onClick={() => setTerm('')}
                role="button"
                tabIndex="0"
            >
            </div>
            {/* eslint-enable */}
        </AutocompleteInput>
    )
})