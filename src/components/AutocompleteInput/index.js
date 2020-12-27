import React, { useState, useRef } from 'react';
import AutocompleteInput from './AutocompleteInput.styled';

export default ({ items, placeholder }) => {
    const uniqueID = useRef(Math.random())
    const [term, setTerm] = useState('');

    const handleChange = (event) => {
        setTerm(event.target.value);
    }

    const stopBubbling = (event) => {
        event.stopPropagation();
    }

    return (
        <AutocompleteInput
            onMouseDown={stopBubbling}
            onMouseUp={stopBubbling}
            onMouseMove={stopBubbling}
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
        </AutocompleteInput>
    )
}