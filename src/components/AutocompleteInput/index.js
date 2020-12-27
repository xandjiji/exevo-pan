import React, { useState } from 'react';
import AutocompleteInput from './AutocompleteInput.styled';

export default ({ items, placeholder }) => {
    const [active, setActive] = useState(false);
    const [term, setTerm] = useState('');

    const handleChange = (event) => {
        setTerm(event.target.value);
    }

    const stopBubbling = (event) => {
        event.stopPropagation();
    }

    return (
        <AutocompleteInput
            className={`${active ? 'active' : ''}`}
            onMouseUp={stopBubbling}
            onMouseMove={stopBubbling}
        >
            <input
                placeholder={placeholder}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                value={term}
                onChange={handleChange}
            />

            <div className="item-list custom-scrollbar shadow">
                {items.map((server, index) => {
                    return (
                        <div
                            key={index}
                            role="button"
                            tabIndex="0"
                            className={term === server ? 'active' : ''}
                            onMouseDown={() => setTerm(server)}
                        >
                            {server}
                        </div>
                    )
                })}
            </div>
        </AutocompleteInput>
    )
}