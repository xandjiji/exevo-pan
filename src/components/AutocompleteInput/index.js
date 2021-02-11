import React, { useState, useEffect, useRef } from 'react';
import AutocompleteInput from './AutocompleteInput.styled';

export default ({ labelFor, items, placeholder, onChange }) => {
    const uniqueID = useRef(Math.random())
    const inputRef = useRef(null);
    const [term, setTerm] = useState('');
    const [valid, setValid] = useState('neutral');

    const handleChange = (event) => {
        const { value } = event.target;

        const { valid, string } = isValueValid(value, items);

        if (valid) {
            setValid('valid');
        } else {
            setValid('neutral');
        }

        setTerm(string);
    }

    const handleKey = (event) => {
        if (event.key === 'Enter') inputRef.current.blur();
    }

    const handleBlur = () => {
        if(term !== '' && valid === 'neutral') {
            setValid('invalid');
        }
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
                id={labelFor}
                className={valid}
                list={uniqueID.current}
                placeholder={placeholder}
                value={term}
                onChange={handleChange}
                onKeyDown={handleKey}
                onBlur={handleBlur}
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
                onClick={() => { setTerm(''); setValid('neutral'); }}
                role="button"
                tabIndex="0"
                aria-label="Reset field"
            >
            </div>
            {/* eslint-enable */}
        </AutocompleteInput>
    )
}

const isValueValid = (string, dataList) => {
    const sanitizedString = string.toLowerCase();

    for (const dataItem of dataList) {
        const sanitizeddataItem = dataItem.toLowerCase();
        if (sanitizedString === sanitizeddataItem) return { valid: true, string: dataItem };
    }
    return { valid: false, string: string };
}