import React, { useState, useEffect, useRef, useCallback } from 'react';
import AutocompleteInput from './AutocompleteInput.styled';

export default ({ labelFor, items, placeholder, onChange, clearAfterSucessful, clearInput, initialValue }) => {
    const uniqueID = useRef(Math.random())
    const inputRef = useRef(null);
    const [term, setTerm] = useState(initialValue || '');
    const [valid, setValid] = useState('neutral');

    const handleChange = useCallback((event) => {
        const { value } = event.target;

        const { valid, string } = isValueValid(value, items);

        if (valid) {
            setValid('valid');
        } else {
            setValid('neutral');
        }

        setTerm(string);
    }, [items])

    const handleKey = (event) => {
        if (event.key === 'Enter') inputRef.current.blur();
    }

    const handleBlur = () => {
        if (!items) return;
        if (term !== '' && valid === 'neutral') {
            setValid('invalid');
        }
    }

    useEffect(() => {
        const timeOutObj = setTimeout(() => {
            onChange(term)
            if (clearAfterSucessful) {
                if (valid === 'valid') {
                    setTerm('');
                    setValid('neutral');
                    inputRef.current.blur();
                    inputRef.current.focus();
                }
            }
        }, 200);
        return () => clearTimeout(timeOutObj);
    }, [term, valid, inputRef, clearAfterSucessful, onChange]);

    useEffect(() => {
        if(clearInput) {
            handleChange({ target: { value: '' }});
        }
    }, [clearInput, handleChange])

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

            {items ?
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
                : null
            }

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

    if (!dataList) return { valid: false, string: string };

    for (const dataItem of dataList) {
        const sanitizeddataItem = dataItem.toLowerCase();
        if (sanitizedString === sanitizeddataItem) return { valid: true, string: dataItem };
    }
    return { valid: false, string: string };
}