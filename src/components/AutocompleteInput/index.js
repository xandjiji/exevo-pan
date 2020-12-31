import React, { useState, useEffect, useRef } from 'react';
import AutocompleteInput from './AutocompleteInput.styled';

export default ({ items, placeholder, onChange }) => {
    const uniqueID = useRef(Math.random())
    const [term, setTerm] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }

    useEffect(() => {
        const timeOutObj = setTimeout(() => onChange(term), 500);
        return () => clearTimeout(timeOutObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

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
}